require 'rails_helper'

RSpec.describe Record, type: :model do
  describe 'associations' do
    it { is_expected.to belong_to(:entity) }

    it { is_expected.to have_many(:properties) }
  end

  describe 'macros' do
    it { is_expected.to accept_nested_attributes_for(:properties) }
  end
end
