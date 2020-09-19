require 'rails_helper'

RSpec.describe CancelTransferRequest, type: :interactor do
  describe '.call' do
    context 'cancel team ownership transfer request' do
      it 'is successful' do
        team = create(:team)
        user = create(:user)

        team.request_transfer_to!(user)

        result = CancelTransferRequest.call!(team: team)

        expect(result).to be_a_success
        expect(team.transfer_digest).to be_nil
        expect(team.transfer_owner).to be_nil
        expect(team.transfer_generated_at).to be_nil
      end
    end
  end
end
