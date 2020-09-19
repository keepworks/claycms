require 'rails_helper'

RSpec.describe User, type: :model do
  describe 'associations' do
    it { is_expected.to have_many(:team_memberships) }
    it { is_expected.to have_many(:transferable_teams).class_name('Team').dependent(:nullify) }

    it { is_expected.to have_many(:teams).through(:team_memberships) }
  end

  describe 'validations' do
    it { is_expected.to validate_presence_of(:email) }
    it { is_expected.to validate_uniqueness_of(:email).case_insensitive }
    it { is_expected.to validate_presence_of(:first_name) }
    it { is_expected.to validate_presence_of(:last_name) }
  end
end
