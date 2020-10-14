class Entity < ApplicationRecord
  include NestedFetchable
  include Uid

  belongs_to :parent, class_name: 'Entity', optional: true
  belongs_to :project

  has_closure_tree order: 'position', numeric_order: true, dependent: :destroy

  has_many :fields, dependent: :destroy
  has_many :relationships, dependent: :destroy
  has_many :records, dependent: :destroy
  has_many :referenced_fields, class_name: 'Field', foreign_key: :referenced_entity_id, inverse_of: :referenced_entity, dependent: :nullify

  validates :label, presence: true
  validates :name, presence: true

  has_nested :fields
end
