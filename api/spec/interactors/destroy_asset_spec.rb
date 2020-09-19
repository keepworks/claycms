require 'rails_helper'

RSpec.describe DestroyAsset, type: :interactor do
  describe '.call' do
    it 'must destroy the asset' do
      @result = DestroyAsset.call(asset: create(:asset))

      expect(@result).to be_a_success
      expect(@result.asset).to be_destroyed
    end
  end
end
