require 'rails_helper'

RSpec.describe UpdateAsset, type: :interactor do
  describe '.call' do
    let(:asset) { create(:asset, name: 'Test Asset 1') }

    context 'when given valid params' do
      it 'is successful' do
        valid_params = {
          name: 'Test Asset 2',
          file: File.open(Rails.root.join('fixtures', 'assets', 'logo.png'))
        }

        result = UpdateAsset.call(params: valid_params, asset: asset)

        expect(result).to be_a_success
        expect(result.asset.name).to eq('Test Asset 2')
        expect(result.asset.file.storage_key).to eq(:store)
      end
    end

    context 'when given invalid params' do
      it 'is a failure' do
        invalid_params = {
          name: ''
        }

        expect { UpdateAsset.call(params: invalid_params, asset: asset) }.to raise_exception(ActiveRecord::RecordInvalid)
      end
    end
  end
end
