module Types
  class RelationshipType < ApplicationType
    model_class Relationship

    relationship :entity
    relationship :field

    # todos
    # - add linked entity
    # - add linked fied
  end
end
