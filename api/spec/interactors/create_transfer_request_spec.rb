require 'rails_helper'

RSpec.describe CreateTransferRequest, type: :interactor do
  describe '.call' do
    let(:user) { create(:user) }
    let(:team) { create(:team) }

    context 'when given valid params' do
      before do
        @valid_user = create(:user)

        valid_params = {
          user_id: @valid_user.id
        }

        team.team_memberships.create!(
          user: @valid_user,
          role: 'manager'
        )

        @result = CreateTransferRequest.call(params: valid_params, team: team)
      end

      it 'is successful' do
        expect(@result).to be_a_success
      end

      it 'generates transfer request' do
        expect(@result.team.transfer_owner).to eq(@valid_user)
        expect(@result.team.transfer_token).not_to be_nil
        expect(@result.team.transfer_generated_at).not_to be_nil
      end
    end

    context 'when invalid user is given' do
      before do
        invalid_params = {
          user_id: -1
        }

        @result = CreateTransferRequest.call(params: invalid_params, team: team)
      end

      it 'is a failure' do
        expect(@result).to be_a_failure
        expect(@result.error).to eq('The user you have selected does not exist.')
      end

      it 'does not generate transfer request' do
        expect(@result.team.transfer_owner).to be_nil
        expect(@result.team.transfer_token).to be_nil
        expect(@result.team.transfer_generated_at).to be_nil
      end
    end

    context 'when onboarding pending user is given' do
      before do
        invalid_params = {
          user_id: user.id
        }

        @result = CreateTransferRequest.call(params: invalid_params, team: team)
      end

      it 'is a failure' do
        expect(@result).to be_a_failure
      end

      it 'does not generate transfer request' do
        expect(@result.team.transfer_owner).to be_nil
        expect(@result.team.transfer_token).to be_nil
        expect(@result.team.transfer_generated_at).to be_nil
      end
    end

    context 'when user not belonging to the team is given' do
      before do
        invalid_user = create(:user)
        invalid_params = {
          user_id: invalid_user.id
        }

        @result = CreateTransferRequest.call(params: invalid_params, team: team)
      end

      it 'is a failure' do
        expect(@result).to be_a_failure
        expect(@result.error).to eq('The user you have selected does not belong to this team.')
      end

      it 'does not generate transfer request' do
        expect(@result.team.transfer_owner).to be_nil
        expect(@result.team.transfer_token).to be_nil
        expect(@result.team.transfer_generated_at).to be_nil
      end
    end

    context 'when user is the owner of the team' do
      before do
        invalid_user = create(:user)
        invalid_params = {
          user_id: invalid_user.id
        }

        team.team_memberships.create!(
          user: invalid_user,
          role: 'owner'
        )

        @result = CreateTransferRequest.call(params: invalid_params, team: team)
      end

      it 'is a failure' do
        expect(@result).to be_a_failure
        expect(@result.error).to eq('The user you have selected is already the owner of this team.')
      end

      it 'does not generate transfer request' do
        expect(@result.team.transfer_owner).to be_nil
        expect(@result.team.transfer_token).to be_nil
        expect(@result.team.transfer_generated_at).to be_nil
      end
    end
  end
end
