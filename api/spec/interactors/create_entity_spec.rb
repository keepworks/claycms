require 'rails_helper'

RSpec.describe CreateEntity, type: :interactor do
  describe '.call' do
    let(:project) { create(:project) }

    context 'when given valid params' do
      before do
        valid_params = {
          name: "Entity Name #{project.id}-1",
          label: "Entity Label #{project.id}-1",
          singleton: true
        }

        @result = CreateEntity.call(params: valid_params, project: project)
      end

      it 'is successful' do
        expect(@result).to be_a_success
        expect(@result.entity.name).to eq("Entity Name #{project.id}-1")
        expect(@result.entity.label).to eq("Entity Label #{project.id}-1")
        expect(@result.entity.singleton).to eq(true)
      end
    end

    context 'when given invalid params' do
      it 'is a failure' do
        invalid_params = {
          name: ''
        }

        expect { CreateEntity.call(params: invalid_params, project: project) }.to raise_exception(ActiveRecord::RecordInvalid)
      end
    end
  end
end
