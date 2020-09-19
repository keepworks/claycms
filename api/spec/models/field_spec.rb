require 'rails_helper'

RSpec.describe Field, type: :model do
  describe 'associations' do
    it { is_expected.to belong_to(:entity).optional }
    it { is_expected.to have_many(:relationships) }
    it { is_expected.to have_many(:properties) }
  end

  describe 'validations' do
    it { is_expected.to validate_presence_of(:label) }
    it { is_expected.to validate_presence_of(:name) }
    it { is_expected.to validate_presence_of(:data_type) }
    it { is_expected.to validate_presence_of(:position) }
  end
end
