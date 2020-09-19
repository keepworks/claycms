module Types
  class FieldType < ApplicationType
    model_class Field

    attribute :data_type
    attribute :default_value
    attribute :editor
    attribute :element_type
    attribute :referenced_entity_id
    attribute :hint
    attribute :label
    attribute :name
    attribute :position
    attribute :validations, Scalars::JsonType, null: true
    attribute :settings, Scalars::JsonType, null: true

    field :parentId, ID, null: true

    relationship :entity
    relationship :children
  end
end
