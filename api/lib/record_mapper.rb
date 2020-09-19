class RecordMapper
  def initialize
    @memoized_entities = {}
    @fields_mapping = []
  end

  def to_json(record, key_type = nil)
    return if record.blank?

    key_type ||= :camelize

    resolved_values = resolve_values(record)

    json = record.slice(:id, :created_at, :updated_at)
      .merge(entity_name: record.entity.name)
      .merge(resolved_values)

    json.deep_transform_keys! { |k| k.camelize(:lower) } if key_type.try(:to_sym) == :camelize
    json
  end

  private

  def resolve_values(record)
    root_fields = root_fields_of(record.entity)
    properties = record.nested_properties

    root_fields.each_with_object({}) do |field, obj|
      property = properties.find { |p| p.field_id == field.id }

      obj[field.name] = property_value(property, properties)
    end
  end

  def property_value(property, properties) # rubocop:disable Metrics/PerceivedComplexity,Metrics/CyclomaticComplexity
    return if property.blank?

    field = field_of(property)
    child_properties = child_properties_of(property, properties)

    if field.array?
      child_properties.map { |cp| property_value(cp, properties) }.compact
    elsif field.key_value?
      child_properties.each_with_object({}) do |child_property, obj|
        child_field = field_of(child_property)

        obj[child_field.name] = property_value(child_property, properties)
      end
    elsif field.reference?
      to_json(property.linked_record)
    elsif field.image? || field.file?
      property.asset&.resolve_url_for(field)
    elsif field.boolean?
      property.value == 't' || property.value.downcase == 'true' || property.value == '1'
    else
      property.value
    end
  end

  def root_fields_of(entity)
    memoize(entity) if !memoized? entity

    memoized(entity)[:root_fields]
  end

  def memoize(entity)
    fields = entity.nested_fields
    @memoized_entities[entity.id] = { root_fields: fields.select { |f| f.parent_id.blank? } }

    map_field_id_to_field_object(fields)
  end

  def memoized?(entity)
    memoized(entity).present?
  end

  def memoized(entity)
    @memoized_entities[entity.id]
  end

  def map_field_id_to_field_object(fields)
    (fields || []).each { |f| @fields_mapping[f.id] = f }
  end

  def field_of(property)
    @fields_mapping[property.field_id]
  end

  def child_properties_of(property, properties)
    properties.select { |p| p.parent_id == property.id }.sort_by(&:position)
  end
end
