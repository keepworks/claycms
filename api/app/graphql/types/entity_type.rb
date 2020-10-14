module Types
  class EntityType < ApplicationType
    model_class Entity

    attribute :label
    attribute :name
    attribute :singleton
    attribute :position

    relationship :fields
    relationship :parent
    relationship :project
    relationship :records
  end
end
