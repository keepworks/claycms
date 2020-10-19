class Record < ApplicationRecord
  include NestedFetchable
  include Uid

  belongs_to :entity

  has_many :properties, dependent: :destroy
  has_many :linked_properties, class_name: 'Property', foreign_key: :linked_record_id, inverse_of: :linked_record, dependent: :destroy

  has_nested :properties

  accepts_nested_attributes_for :properties

  # To fix the hierarchy of the parent and respective cloned record
  after_destroy -> { Property.rebuild! }
  after_update -> { Property.rebuild! }

  # To clone record and its properties
  amoeba do
    enable
    set uid: SecureRandom.uuid
  end

  def convert_to_json(key_type = nil)
    key_type ||= :camelize

    json = slice(:id, :created_at, :updated_at)
    json = json.merge(entity_name: entity.name)

    entity_fields = entity.fields
    record_properties = properties.includes(:field).where(field: entity_fields.pluck(:id))

    entity_fields.each do |field|
      property = record_properties.find { |p| p.field_id == field.id }

      json[field.name] = property&.data
    end

    json.deep_transform_keys! { |k| k.camelize(:lower) } if key_type.try(:to_sym) == :camelize
    json
  end
end
