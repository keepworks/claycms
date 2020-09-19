require 'rails_helper'

RSpec.describe UpdateUser, type: :interactor do
  describe '.call' do
    context 'when valid params are given' do
      it 'is successful' do
        user = create(:user, first_name: 'first name', last_name: 'last name')

        valid_params = {
          first_name: 'new first name',
          last_name: 'new last name',
          profile_picture: File.open(Rails.root.join('fixtures', 'assets', 'logo.png'))
        }

        result = UpdateUser.call(params: valid_params, user: user)

        expect(result).to be_a_success
        expect(result.user.first_name).to eq('new first name')
        expect(result.user.last_name).to eq('new last name')
        expect(result.user.profile_picture.storage_key).to eq(:store)
      end
    end

    context 'when no params are given' do
      it 'does not change value' do
        user = create(:user, first_name: 'first name', last_name: 'last name')

        params = {}

        result = UpdateUser.call(params: params, user: user)

        expect(result.user.first_name).to eq('first name')
        expect(result.user.last_name).to eq('last name')
        expect(result.user.profile_picture).to eq(nil)
      end
    end

    context 'when first name and last name are empty' do
      it 'is a failure' do
        user = create(:user, first_name: 'first name', last_name: 'last name')

        invalid_params = {
          first_name: '',
          last_name: ''
        }

        expect { UpdateUser.call(params: invalid_params, user: user) }.to raise_exception(ActiveRecord::RecordInvalid)
      end
    end
  end
end
