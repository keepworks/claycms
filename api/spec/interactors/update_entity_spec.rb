require 'rails_helper'

RSpec.describe UpdateEntity, type: :interactor do
  describe '.call' do
    let(:entity) { create(:entity) }

    context 'when given valid params' do
      it 'is successful' do
        valid_params = {
          name: 'Test Entity 2',
          label: 'Test Entity 2'
        }

        result = UpdateEntity.call(params: valid_params, entity: entity)

        expect(result).to be_a_success
        expect(result.entity.name).to eq('Test Entity 2')
      end
    end

    context 'when given invalid params' do
      it 'is a failure' do
        invalid_params = {
          name: ''
        }

        expect { UpdateEntity.call(params: invalid_params, entity: entity) }.to raise_exception(ActiveRecord::RecordInvalid)
      end
    end
  end
end
