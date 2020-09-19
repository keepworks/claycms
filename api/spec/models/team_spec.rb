require 'rails_helper'

RSpec.describe Team, type: :model do
  it_behaves_like 'transferable'

  describe 'associations' do
    it { is_expected.to have_many(:team_memberships) }
    it { is_expected.to have_many(:users).through(:team_memberships) }
    it { is_expected.to have_many(:projects) }
  end

  describe 'validations' do
    it { is_expected.to validate_presence_of(:name) }
  end
end
