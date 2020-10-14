class Field < ApplicationRecord
  include Uid

  serialize :validations, JSON
  serialize :settings, JSON

  has_closure_tree order: 'position', numeric_order: true, dependent: :destroy

  enum data_type: { single_line_text: 0, multiple_line_text: 1, number: 2, decimal: 3, boolean: 4, image: 5, key_value: 6, reference: 7, array: 8, color: 9, file: 10, json: 11 }
  enum element_type: Field.data_types.except(:array), _prefix: :element

  belongs_to :entity, optional: true
  belongs_to :referenced_entity, class_name: 'Entity', optional: true

  has_many :properties, dependent: :destroy
  has_many :relationships, dependent: :destroy

  validates :data_type, presence: true
  validates :label, presence: true
  validates :name, presence: true
  validates :position, presence: true

  after_initialize :set_defaults

  accepts_nested_attributes_for :children

  protected

  def set_defaults
    return unless new_record?

    self.validations ||= {}
    self.settings ||= {}
  end
end
