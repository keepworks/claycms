module Types
  class PropertyType < ApplicationType
    model_class Property

    attribute :value
    attribute :position

    field :parentId, String, null: true

    relationship :asset
    relationship :children
    relationship :field
    relationship :linked_record
    relationship :record
  end
end
