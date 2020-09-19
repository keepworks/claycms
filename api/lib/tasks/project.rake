require 'csv'
require 'json'

FOLDER_PATH = 'public/exports'.freeze
FILE_NAME = 'data.json'.freeze
ASSET_PATH = "#{FOLDER_PATH}/assets".freeze
FILE_PATH = "#{FOLDER_PATH}/#{FILE_NAME}".freeze

namespace :project do
  desc 'Export Project data to a JSON file'
  task export: :environment do
    current_project = Project.find_by(id: ENV['PROJECT_ID'])

    raise 'Project not found!' if current_project.blank?

    entities = current_project.entities.includes(:fields).order(created_at: :asc)
    data = { project: current_project.slice(:name), entities: [], records: [] }

    def process_properties_for(record)
      record_json = {}
      record.properties.each do |property|
        record_json[property.field.name] = property_value(property)
      end

      record_json
    end

    def property_value(property) # rubocop:disable Metrics/CyclomaticComplexity, Metrics/PerceivedComplexity
      if property.field.array?
        property.children.sort_by(&:position).map do |child|
          child_value = { position: child.position }
          value = property_value(child)
          if child.field.reference?
            child_value[:id] = value
          else
            child_value[:value] = value
          end

          child_value
        end
          .compact
      elsif property.field.key_value?
        property.children.each_with_object({}) { |child, obj| obj[child.field.name] = property_value(child); }
      elsif property.field.reference?
        property.linked_record_id
      elsif property.field.image? || property.field.file?
        {
          name: property.asset&.name,
          url: property.asset&.resolve_url_for(property.field)
        }
      else
        property.value
      end
    end

    def process_fields(fields_all, root_fields)
      root_fields.map do |field|
        parsed_field = field.slice(:label, :name, :data_type, :default_value, :validations, :hint, :position, :editor, :element_type, :settings)
        child_fields = fields_all.select { |f| f.parent == field }
        is_sub_parent = child_fields.length == 1 && field.array?

        parsed_field[:referenced_entity_name] = field.referenced_entity&.name || ''

        if is_sub_parent
          sub_parent = child_fields.first
          sub_child_fields = fields_all.select { |f| f.parent == sub_parent }

          parsed_field[:children] = process_fields(fields_all, sub_child_fields)
        elsif child_fields.present?
          parsed_field[:children] = process_fields(fields_all, child_fields)
        end

        parsed_field
      end
    end

    entities.each do |entity|
      parsed_entity = entity.slice(:name, :label, :singleton)
      parsed_entity[:parent_name] = entity.parent&.name || ''

      parsed_entity[:fields] = entity.fields.map do |field|
        flattened_fields = field.self_and_descendants
        root_fields = flattened_fields.reject(&:parent)

        process_fields(flattened_fields, root_fields)
      end
        .flatten
        .compact

      data[:entities] << parsed_entity
    end

    data[:records] = current_project.entities
      .map(&:records)
      .flatten
      .sort_by(&:created_at)
      .map do |record|
        parsed_record = { ref_id: record.id, entity_name: record.entity.name }

        parsed_record[:traits] = process_properties_for(record)

        parsed_record
      end

    Dir.mkdir(FOLDER_PATH) unless Dir.exist?(FOLDER_PATH)
    File.open(FILE_PATH, 'w') do |f|
      f.write(data.to_json)
    end
  end

  desc 'Import Project data from a JSON File'
  task import: :environment do
    team = Team.find_by(id: ENV['TEAM_ID'])

    raise "Team id: #{ENV['TEAM_ID']}, not found!" if team.blank?

    data = JSON.parse(File.read(FILE_PATH), symbolize_names: true)

    # Step 1 - Create project
    project = CreateProject.call!(params: data[:project], team: team).project

    # Step 2 - Create all entities
    data[:entities].each do |entity|
      parent_entity = Entity.find_by(name: entity[:parent_name])

      e = project.entities.new(entity.except(:parent_name, :fields))
      e.parent_id = parent_entity&.id

      e.save!
    end

    # Step 3 - Add fields to entities (Need all entity for referenced_entities)
    data[:entities].each do |entity|
      loaded_entity = Entity.find_by(name: entity[:name])

      entity[:fields].map do |field|
        CreateField.call!(params: field, entity: loaded_entity, is_import: true)
      end
    end

    # Step 4 - Create records without the reference records.
    record_index = {}
    data[:records].each do |record|
      entity = Entity.find_by(name: record[:entity_name])
      result = CreateRecord.call!(params: record, entity: entity, is_import: true)
      record_index[record[:ref_id]] = result.record.id
    end

    # Step 5 - Update records to map reference records
    data[:records].each do |record|
      resolved_record = Record.find(record_index[record[:ref_id]])
      UpdateRecord.call!(params: record, record: resolved_record, is_import: true, record_index: record_index)
    end
  end
end
