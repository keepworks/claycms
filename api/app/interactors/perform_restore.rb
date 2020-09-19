# rubocop:disable Metrics/ClassLength
require 'open-uri'

class PerformRestore
  include Interactor

  MODELS = [Entity, Field, Record, Property].freeze
  MODELS_AS_TREE = [:field, :property].freeze
  MODEL_PRIMARY_BELONGS_TO = {
    entity: :project,
    field: :entity,
    property: :record,
    record: :entity
  }.freeze
  OPERATIONS = [:create, :update, :destroy].freeze

  def call
    ActiveRecord::Base.transaction do
      setup
      process
      restore_resources
      destroy_temp_file
      update_restore_complete
    end
  end

  def setup
    # Initialize mapping
    @mapping = MODELS.each_with_object({}) { |m, o| o[m.name.downcase.to_sym] = {} }
    @local_data = {}
    @local_export = nil

    open(context.restore.url) { |io| @raw_data = io.read }
    @remote_data = JSON.parse(@raw_data, symbolize_names: true)
  end

  def process
    if project_empty?
      MODELS.each do |model|
        set_current_model(model)

        data = @remote_data[current_model_name]
        create_records(data)

        if MODELS_AS_TREE.include? current_model_name
          hierarchy_data = @remote_data[current_hierarchy]
          create_hierarchies(hierarchy_data)
        end
      end
    else
      @local_export = PerformExport.call!(project: context.project, skip_upload: true, include_id: true)
      @local_data = JSON.parse(File.read(@local_export.path), symbolize_names: true)

      MODELS.each do |model|
        set_current_model(model)

        initialize_uid_mapping

        data = compose_diff(
          @local_data[current_model_name],
          @remote_data[current_model_name]
        )

        if MODELS_AS_TREE.include? current_model_name
          hierarchy_data = compose_hierarchy_diff(
            @local_data[current_hierarchy],
            @remote_data[current_hierarchy]
          )
        end

        OPERATIONS.each do |operation|
          public_send("#{operation}_records", data[operation])
          public_send("#{operation}_hierarchies", hierarchy_data[operation]) if MODELS_AS_TREE.include? current_model_name
        end
      end
    end
  end

  def restore_resources
    diff = Diff.perform(@local_data[:resources], @remote_data[:resources], identifier: :name, ignore: [[:url]])
    resources = context.project.resources

    diff[:create].each do |resource|
      resources.create!(
        project: context.project, # if project not passed explicitly, project_id becomes nil in generate_location (ResourceFileUploader)
        name: resource[:name],
        file_remote_url: resource[:url]
      )
    end

    diff[:destroy].each do |resource|
      resources.find_by(name: resource[:name])&.destroy
    end

    diff[:update].each do |resource|
      resolved_resource = resources.find_by(name: resource[:name])
      resolved_resource&.update(file_remote_url: resource[:url])
    end
  end

  def destroy_temp_file
    path = @local_export&.path

    return if path.blank?

    File.delete(path) if File.exist?(path)
  end

  def update_restore_complete
    context.restore.completed!
  end

  def create_records(data)
    data.each do |dataset|
      next if dataset.empty?

      import_and_sync_records_for(dataset)
    end
  end

  def update_records(data)
    data.each do |dataset|
      next if dataset.empty?

      sorted_dataset = map_references(dataset).sort_by { |c| c[:uid] }
      loaded_records = fetch_from_db(sorted_dataset).order(:uid)

      loaded_records.zip(sorted_dataset).each { |r, v| r.update(v) }
    end
  end

  def destroy_records(data)
    data.each do |dataset|
      next if dataset.empty?

      dataset.each { |r| @mapping[current_model_name][r[:uid]] = r[:id] }
      ids = dataset.collect { |d| d[:id] }

      current_model.where(id: ids).destroy_all
    end
  end

  def create_hierarchies(data)
    query = hierarchies_insertion_query(data)

    ActiveRecord::Base.connection.execute(query) if query.present?
  end

  def update_hierarchies(data)
    # No op
  end

  def destroy_hierarchies(data)
    query = hierarchies_deletion_query(data)

    ActiveRecord::Base.connection.execute(query) if query.present?
  end

  def compose_diff(local_data, remote_data)
    diff = {
      create: [],
      update: [],
      destroy: []
    }

    i = 0

    # Refactor using zip?
    while i < local_data.length && i < remote_data.length
      chunk_diff = Diff.perform(local_data[i], remote_data[i], ignore: [[:asset_id, :url], [:id], [:position]])

      diff[:create] << chunk_diff[:create]
      diff[:update] << chunk_diff[:update]
      diff[:destroy] << chunk_diff[:destroy]

      i += 1
    end

    diff[:destroy] << local_data[i..local_data.length] if i != local_data.length
    diff[:create] << remote_data[i..remote_data.length] if i != remote_data.length
    diff
  end

  def compose_hierarchy_diff(local_data, remote_data)
    {
      create: remote_data - local_data,
      destroy: local_data - remote_data
    }
  end

  def import_and_sync_records_for(dataset)
    return if dataset.empty?

    records = map_references(dataset)

    current_model.import records

    reload_mapping_for(records)
  end

  def map_references(records)
    records.map do |record|
      cloned_record = record.clone
      # map all belongs_to relation
      associations.each do |association_name, association_model_name|
        association = "#{association_name}_id".to_sym # :property_id, :linked_record_id etc.

        if association_name == :project
          cloned_record[association] = context.project.id
        elsif association_name == :asset && record[:asset_id].present?
          begin
            cloned_record[:asset_id] = asset_for(record)&.id
          rescue StandardError => e
            Rails.logger.debug "Failed to add #{record}"
            Rails.logger.debug e
          end
        elsif record[association].present?
          cloned_record[association] = resolve_id(association_model_name, record[association])
        end
      end

      cloned_record
    end
  end

  def asset_for(record)
    context.project.assets.create!(
      name: record[:asset_id][:name],
      file_remote_url: record[:asset_id][:url]
    )
  end

  def associations
    current_model.reflect_on_all_associations(:belongs_to).each_with_object({}) do |association, obj|
      obj[association.name] = association.class_name.downcase.to_sym
    end
  end

  def resolve_id(model_name, uid)
    @mapping[model_name][uid]
  end

  # This method is responsible for mapping saved records's uid to it's actual id after create.
  # It fetches the recently created records(fetch_from_db) by collecting uid from the raw list of records(before saving),
  # fetches the records from db and maps.
  def reload_mapping_for(records)
    (fetch_from_db(records) || []).each do |record|
      @mapping[current_model_name][record.uid] = record.id
    end
  end

  def hierarchies(data)
    (data || []).map do |hierarchy|
      {
        ancestor_id: resolve_id(current_model_name, hierarchy[:ancestor_id]),
        descendant_id: resolve_id(current_model_name, hierarchy[:descendant_id]),
        generations: hierarchy[:generations]
      }
    end
  end

  def initialize_uid_mapping
    @local_data[current_model_name].each do |dataset|
      (dataset || []).each do |record|
        @mapping[current_model_name][record[:uid]] = record[:id]
      end
    end
  end

  # This method fetches the recently created records from the db.
  # If Project B is being cloned from Project A then a particular record in both the project would have
  # the same UID. So in order to fetch the records using their UID, there needs to another identifier that
  # can uniquely identify a record (a composite key). For models having nested elements, there are two possibilities
  # There could be a direct belongs to, like record_id for Property. But for nested elements, this record_id would be nil
  # and it would be identified by parent_id.
  def fetch_from_db(records)
    return [] if records.empty?

    identifier = primary_identifier_of(records.first)
    identifier_ids = records.collect { |r| r[identifier] }.uniq
    records_uid = records.collect { |r| r[:uid] }

    current_model.where(uid: records_uid).where(identifier => identifier_ids)
  end

  def primary_identifier_of(record)
    is_child_generation = record[:parent_id].present?
    primary_identifier = "#{MODEL_PRIMARY_BELONGS_TO[current_model_name]}_id".to_sym
    secondary_identifier = :parent_id

    is_child_generation ? secondary_identifier : primary_identifier
  end

  def hierarchies_insertion_query(data)
    return '' if data.empty?

    records = hierarchies(data)
    values = records.map { |r| "(#{r.values.join(', ')})" }.join(', ')

    %(
      INSERT INTO #{current_hierarchy} (ancestor_id, descendant_id, generations)
      VALUES #{values};
    )
  end

  def hierarchies_deletion_query(data)
    return '' if data.empty?

    records = hierarchies(data)
    values = records.map { |r| "(#{r.values.join(', ')})" }.join(', ')

    %(
      DELETE FROM #{current_hierarchy}
      WHERE (ancestor_id, descendant_id, generations)
      IN (#{values});
    )
  end

  def current_model_name
    current_model.name.downcase.to_sym
  end

  def current_hierarchy
    "#{current_model_name}_hierarchies".to_sym
  end

  def current_model
    @model
  end

  def set_current_model(model) # rubocop:disable Naming/AccessorMethodName: Do not prefix writer method names with set_.
    @model = model
  end

  def project_empty?
    context.project.entities.empty?
  end
end
# rubocop:enable Metrics/ClassLength
