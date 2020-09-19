require 'rails_helper'

RSpec.describe Project, type: :model do
  describe 'associations' do
    it { is_expected.to belong_to(:team) }
    it { is_expected.to have_many(:assets).dependent(:destroy) }
    it { is_expected.to have_many(:key_pairs).dependent(:destroy) }
    it { is_expected.to have_many(:entities).dependent(:destroy) }
    it { is_expected.to have_many(:locales).dependent(:destroy) }
    it { is_expected.to have_many(:resources).dependent(:destroy) }
  end

  describe 'validations' do
    it { is_expected.to validate_presence_of(:name) }
    it { is_expected.to validate_presence_of(:uid) }
    it { is_expected.to validate_uniqueness_of(:uid) }
  end
end
