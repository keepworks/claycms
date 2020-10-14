class CreateRecord
  include Interactor

  def call
    ActiveRecord::Base.transaction do
      process_traits
      create_record
    end
  end

  protected

  def process_traits
    context.properties_attributes = (context.params[:traits] || {}).map do |field_name, value|
      field = context.entity.fields.find_by(name: field_name)

      process_value(field, value)
    end
  end

  def create_record
    context.record = context.entity.records.create!(
      properties_attributes: context.properties_attributes
    )
  end

  def process_value(field, value, position = 0) # rubocop:disable Metrics/CyclomaticComplexity, Metrics/PerceivedComplexity
    property = {}

    if field.array?
      property = { field: field, children_attributes: process_array(field, value) }
    elsif field.key_value?
      property = { field: field, children_attributes: process_hash(field, value) }
    elsif field.reference?
      if context.is_import
        imported_record_id = value&.is_a?(Hash) ? value[:id] : value
        property = { field: field, value: "____ref_id____#{imported_record_id}" }
      else
        property = { field: field, linked_record: process_reference(value) }
      end
    elsif field.image? || field.file?
      property = { field: field, asset: process_asset(value) }
    elsif field.json?
      property = { field: field, value: value.to_json }
    else
      property = { field: field, value: value }
    end

    property[:position] = position

    property
  end

  def process_array(field, values)
    return [] if !values.is_a? Array

    sub_field = field.children.first

    processed_values = values.map do |value|
      next if value.except(:position).blank?

      input_value = sub_field.reference? ? value : value[:value]
      process_value(sub_field, input_value, value[:position])
    end

    processed_values.compact
  end

  def process_hash(field, values)
    return [] if !values.is_a? Hash

    values.map do |field_name, value|
      child_field = field.children.find_by(name: field_name)

      process_value(child_field, value)
    end
  end

  def process_reference(value)
    return nil if context.is_import

    linked_record = Record.find_by(id: value[:id]) if value[:id].present?

    if value[:traits].present?
      if linked_record.present?
        linked_record = UpdateRecord.call!(params: value, record: linked_record).record
      else
        entity = Entity.find_by(id: value[:entity_id])
        linked_record = CreateRecord.call!(params: value, entity: entity).record
      end
    end

    linked_record
  end

  def process_asset(value)
    if context.is_import && value.present? && value[:name].present?
      begin
        return context.entity.project.assets.create!(name: value[:name], file_remote_url: value[:url])
      rescue StandardError => e
        Rails.logger.debug "Failed to add #{value}"
        Rails.logger.debug e
      end
    end

    return Asset.find(value[:id]) if value.is_a?(Hash) && value[:id].present?

    return if !value.respond_to?(:content_type)

    context.entity.project.assets.create!(name: value.original_filename, file: value)
  end
end
