class UpdateRecord
  include Interactor

  def call
    ActiveRecord::Base.transaction do
      process
      update_record
    end
  end

  protected

  def process
    context.properties_attributes = (context.params[:traits] || {}).map do |field_name, value|
      field = context.record.entity.fields.find_by(name: field_name)
      property = (context.record.properties || []).find { |p| p.field_id == field.id }

      process_value(field, property, value, context.params[:position])
    end
  end

  def update_record
    context.record.update!(
      properties_attributes: context.properties_attributes
    )
  end

  def process_value(field, property, input_value, position = 0) # rubocop:disable Metrics/CyclomaticComplexity, Metrics/PerceivedComplexity
    attribute = {}

    if field.array?
      attribute = { children_attributes: process_array(field, property, input_value) }
    elsif field.key_value?
      attribute = { children_attributes: process_hash(field, property, input_value) }
    elsif field.reference?
      attribute = { linked_record: process_reference(input_value) }
    elsif field.image? || field.file?
      attribute = { asset: process_asset(input_value) } if !URL.valid?(input_value)
    else
      attribute = { value: input_value }
    end

    if property.present?
      attribute[:id] = property.id
    else
      attribute[:field] = field
    end

    attribute[:position] = position if position.present?

    attribute
  end

  def process_array(field, property, input_values) # rubocop:disable Metrics/CyclomaticComplexity
    if property.present?
      removed_records = property.children.ids - input_values.pluck(:id).map(&:to_i)
      Property.destroy(removed_records) if removed_records.present?
    end

    return [] if !input_values.is_a? Array

    sub_field = field.children.first

    processed_values = input_values.map do |input_value|
      next if input_value.except(:position).blank?

      child_property = property.children.find_by(id: input_value[:id]) if property.present?

      value = sub_field.reference? ? input_value : input_value[:value]
      process_value(sub_field, child_property, value, input_value[:position])
    end

    processed_values.compact
  end

  def process_hash(field, property, input_values)
    return [] if !input_values.is_a? Hash

    input_values.map do |field_name, value|
      child_field = field.children.find_by(name: field_name)
      child_property = (property&.children || []).find { |p| p.field_id == child_field.id }

      process_value(child_field, child_property, value)
    end
  end

  def process_reference(input_value)
    linked_record = Record.find_by(id: input_value[:id]) if input_value[:id].present?

    if input_value&.is_a?(Hash) && input_value[:traits].present?
      if linked_record.present?
        linked_record = UpdateRecord.call!(params: input_value, record: linked_record).record
      else
        entity = Entity.find_by(id: input_value[:entity_id])
        linked_record = CreateRecord.call!(params: input_value, entity: entity).record
      end
    end

    linked_record
  end

  def process_asset(value)
    return Asset.find(value[:id]) if value.is_a?(Hash) && value[:id].present?

    return if !value.respond_to?(:content_type)

    context.record.entity.project.assets.create!(name: value.original_filename, file: value)
  end
end
