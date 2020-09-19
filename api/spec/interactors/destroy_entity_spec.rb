require 'rails_helper'

RSpec.describe DestroyEntity, type: :interactor do
  describe '.call' do
    it 'must destroy the entity' do
      @result = DestroyEntity.call(entity: create(:entity))

      expect(@result).to be_a_success
      expect(@result.entity).to be_destroyed
    end
  end
end
