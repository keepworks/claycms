require 'rails_helper'

RSpec.describe Resource, type: :model do
  describe 'relationships' do
    it { is_expected.to belong_to(:project) }
  end

  describe 'validations' do
    it { is_expected.to validate_presence_of(:name) }
    it { is_expected.to validate_presence_of(:file) }
  end
end
