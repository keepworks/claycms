require 'rails_helper'

RSpec.describe Locale, type: :model do
  describe 'associations' do
    it { is_expected.to belong_to(:project) }
  end

  describe 'validations' do
    it { is_expected.to validate_presence_of(:language) }
  end
end
