require 'rails_helper'

RSpec.describe CreateAsset, type: :interactor do
  describe '.call' do
    let(:project) { create(:project) }

    context 'when given valid params' do
      before do
        valid_params = {
          name: "Asset #{project.id}-1",
          file: File.open(Rails.root.join('fixtures', 'assets', 'logo.png'))
        }

        @result = CreateAsset.call(params: valid_params, project: project)
      end

      it 'is successful' do
        expect(@result).to be_a_success
        expect(@result.asset.name).to eq("Asset #{project.id}-1")
        expect(@result.asset.file.storage_key).to eq(:store)
      end
    end

    context 'when given invalid params' do
      it 'is a failure' do
        invalid_params = {
          name: ''
        }

        expect { CreateAsset.call(params: invalid_params, project: project) }.to raise_exception(ActiveRecord::RecordInvalid)
      end
    end
  end
end
