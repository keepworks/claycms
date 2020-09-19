class Property < ApplicationRecord
  include Uid

  has_closure_tree order: 'position', numeric_order: true, dependent: :destroy

  belongs_to :record, optional: true
  belongs_to :field
  belongs_to :asset, optional: true
  belongs_to :linked_record, class_name: 'Record', optional: true

  accepts_nested_attributes_for :children

  # To clone record and its properties
  amoeba do
    enable
    set uid: SecureRandom.uuid
    clone [:parent]
  end
end
