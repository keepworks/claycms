class PerformExport # rubocop:disable Metrics/ClassLength
  include Interactor

  MAIN_FOLDER_PATH = 'tmp/exports'.freeze
  FILE_NAME = 'data.json'.freeze
  MODELS = [Entity, Field, Record, Property].freeze

  def call
    ActiveRecord::Base.transaction do
      set_default
      collect_entities
      collect_resources
      collect_fields
      collect_field_hierarchies
      collect_records
      collect_properties
      collect_property_hierarchies
      write_to_temp_file
      upload_temp_file
      delete_temp_file
    end
  end

  def set_default
    @mapping = MODELS.each_with_object({}) { |model, obj| obj[model.name.downcase.to_sym] = {} }
    @assets = context.project.assets
    @data = {}
  end

  def collect_entities
    @current_model = Entity
    @entities = context.project.entities
    @data[model_name] = segregrate_and_map(@entities)
  end

  def collect_resources
    @data[:resources] = context.project.resources.map do |resource|
      {
        name: resource.name,
        url: resource.resolve_file,
        size: resource.file.size
      }
    end
  end

  def collect_fields
    @current_model = Field

    sql = %(
      SELECT fields.* FROM fields
      INNER JOIN field_hierarchies ON fields.id = field_hierarchies.descendant_id
      WHERE field_hierarchies.ancestor_id IN (SELECT id from fields where entity_id IN (#{@entities.ids.join(', ')}))
      ORDER BY created_at;
    )

    @fields = @current_model.find_by_sql(sql)
    @data[model_name] = segregrate_and_map(@fields)
  end

  def collect_field_hierarchies
    ids = @fields.pluck(:id).join(', ')

    sql = %(
      SELECT * from field_hierarchies
      WHERE ancestor_id IN (#{ids})
      OR descendant_id IN (#{ids});
    )

    field_hierarchies = ActiveRecord::Base.connection.exec_query(sql).to_a

    @data["#{model_name}_hierarchies"] = field_hierarchies.map { |fh| process_hierarchy_for(fh) }
  end

  def collect_records
    @current_model = Record
    @records = Record.where(entity_id: @entities.ids)
    @data[model_name] = segregrate_and_map(@records)
  end

  def collect_properties
    @current_model = Property
    sql = %(
      SELECT properties.* FROM properties
      INNER JOIN property_hierarchies ON properties.id = property_hierarchies.descendant_id
      WHERE property_hierarchies.ancestor_id IN (SELECT id from properties where record_id IN (#{@records.ids.join(', ')}))
    )

    @properties = ActiveRecord::Base.connection.exec_query(sql).to_a
    @data[model_name] = segregrate_and_map(@properties)
  end

  def collect_property_hierarchies
    ids = @properties.map { |p| p['id'] }.join(', ')

    sql = %(
      SELECT * from property_hierarchies
      WHERE ancestor_id IN (#{ids})
      OR descendant_id IN (#{ids})
    )

    property_hierarchies = ActiveRecord::Base.connection.exec_query(sql).to_a

    @data["#{model_name}_hierarchies"] = property_hierarchies.map { |fh| process_hierarchy_for(fh) }
  end

  def write_to_temp_file
    FileUtils.mkdir_p(folder_path) unless Dir.exist?(folder_path)
    File.open(file_path, 'w') do |f|
      f.write(@data.to_json)
    end
  end

  def upload_temp_file
    if context.skip_upload
      context.path = file_path
    else
      context.export.file = File.open(file_path, 'rb')
      context.export.completed!
    end
  end

  def delete_temp_file
    File.delete(file_path) if File.exist?(file_path) && !context.skip_upload
  end

  # Helper methods

  def file_path
    "#{folder_path}/#{FILE_NAME}"
  end

  def folder_path
    "#{MAIN_FOLDER_PATH}/#{context.project.id}"
  end

  def process_hierarchy_for(node)
    {
      ancestor_id: mapping[node['ancestor_id']],
      descendant_id: mapping[node['descendant_id']],
      generations: node['generations']
    }
  end

  def segregate(records)
    dataset = []
    level = 0
    cloned_records = records.clone.to_a

    until cloned_records.empty?
      if level == 0
        dataset[level] = select_from_array(cloned_records) { |r| (r[:parent_id] || r['parent_id']).nil? }
      else
        parent_ids = dataset[level - 1].map { |r| r[:id] || r['id'] }
        dataset[level] = select_from_array(cloned_records) { |r| parent_ids.include?(r[:parent_id] || r['parent_id']) }
      end

      level += 1
    end

    dataset
  end

  def segregrate_and_map(records)
    segregate(records).map { |set| process(set) }
  end

  def process(records) # rubocop:disable Metrics/CyclomaticComplexity,Metrics/PerceivedComplexity
    records.map do |record|
      normalized_record = record.respond_to?(:attributes) ? record.attributes : record
      attributes = normalized_record.except('created_at', 'updated_at')
      attributes = attributes.except('id') if context.include_id.blank?
      @mapping[model_name][normalized_record['id']] = normalized_record['uid']

      associations.each do |association_name, association_model_name|
        association = "#{association_name}_id" # property_id, linked_record_id etc.

        if association_name == :project
          attributes[association] = nil
        elsif association_name == :asset && attributes['asset_id'].present?
          attributes['asset_id'] = extract_asset_for(attributes)
        elsif attributes[association].present?
          attributes[association] = resolve_uid(association_model_name, attributes[association])
        end
      end

      attributes
    end
  end

  def extract_asset_for(record)
    asset = @assets.find { |a| a.id == record['asset_id'] }

    {
      name: asset&.name,
      url: asset&.resolve_original_file
    }
  end

  def select_from_array(array, &block)
    temp = array.select(&block)
    array.reject!(&block)
    temp
  end

  def resolve_uid(name, id)
    @mapping[name][id] if @mapping[name].present?
  end

  def associations
    model.reflect_on_all_associations(:belongs_to).inject({}) { |obj, a| obj[a.name] = a.class_name.downcase.to_sym; obj } # rubocop:disable Style/EachWithObject,Style/Semicolon
  end

  def model
    @current_model
  end

  def mapping
    @mapping[model_name]
  end

  def model_name
    model.name.downcase.to_sym
  end
end
