require 'rails_helper'

RSpec.describe Relationship, type: :model do
  describe 'associations' do
    it { is_expected.to belong_to(:entity) }
    it { is_expected.to belong_to(:field) }
    it { is_expected.to belong_to(:linked_entity).class_name('Entity').with_foreign_key(:linked_entity_id) }
    it { is_expected.to belong_to(:linked_field).class_name('Field').with_foreign_key(:linked_field_id) }
  end
end
