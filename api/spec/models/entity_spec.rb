require 'rails_helper'

RSpec.describe Entity, type: :model do
  describe 'associations' do
    it { is_expected.to belong_to(:project) }
    it { is_expected.to have_many(:fields) }
    it { is_expected.to have_many(:relationships) }
    it { is_expected.to have_many(:records) }
  end

  describe 'validations' do
    it { is_expected.to validate_presence_of(:label) }
    it { is_expected.to validate_presence_of(:name) }
  end
end
