require 'rails_helper'

RSpec.describe Property, type: :model do
  describe 'associations' do
    it { is_expected.to belong_to(:record).optional }
    it { is_expected.to belong_to(:field) }
  end
end
