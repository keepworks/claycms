class Relationship < ApplicationRecord
  belongs_to :entity
  belongs_to :field

  belongs_to :linked_entity, class_name: 'Entity', foreign_key: :linked_entity_id, inverse_of: :relationships
  belongs_to :linked_field, class_name: 'Field', foreign_key: :linked_field_id, inverse_of: :relationships
end
