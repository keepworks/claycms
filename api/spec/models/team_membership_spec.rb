require 'rails_helper'

RSpec.describe TeamMembership, type: :model do
  describe 'associations' do
    it { is_expected.to belong_to(:user) }
    it { is_expected.to belong_to(:team) }
  end

  describe 'validations' do
    it { is_expected.to validate_presence_of(:role) }
  end
end
