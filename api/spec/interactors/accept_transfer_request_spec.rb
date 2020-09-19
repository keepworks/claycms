require 'rails_helper'

RSpec.describe AcceptTransferRequest, type: :interactor do
  describe '.call' do
    before do
      @owner = create(:user)
      @user = create(:user)
      @team = create(:team)
      @owner_team_membership = create(:team_membership, team: @team, user: @owner, role: :owner)
      @user_team_membership = create(:team_membership, team: @team, user: @user)
    end

    context 'with transfer request' do
      before do
        @transfer_time = Time.zone.today

        @team.request_transfer_to!(@user)
      end

      context 'which has not expired' do
        before do
          @result = AcceptTransferRequest.call(team: @team)
        end

        it 'is successful' do
          expect(@result).to be_a_success
        end

        it 'transfers ownership to new user and sets old owner as manager' do
          expect(@user_team_membership.reload.role).to eq('owner')
          expect(@owner_team_membership.reload.role).to eq('manager')
        end

        it 'resets transfer' do
          expect(@result.team.transfer_owner).to be_nil
          expect(@result.team.transfer_digest).to be_nil
          expect(@result.team.transfer_generated_at).to be_nil
        end
      end

      context 'which has expired' do
        before do
          Timecop.freeze(@transfer_time + Team::TRANSFER_EXPIRY_PERIOD + 1.day)
          @result = AcceptTransferRequest.call(team: @team)
          Timecop.return
        end

        it 'is failure' do
          expect(@result).to be_a_failure
          expect(@result.error).to eq('Your transfer link has either expired or been canceled.')
        end

        it 'does not reset transfer' do
          expect(@result.team.transfer_owner).not_to be_nil
          expect(@result.team.transfer_digest).not_to be_nil
          expect(@result.team.transfer_generated_at).not_to be_nil
        end
      end
    end

    context 'without transfer request' do
      before do
        @result = AcceptTransferRequest.call(team: @team)
      end

      it 'is failure' do
        expect(@result).to be_a_failure
        expect(@result.error).to eq('Your transfer link has either expired or been canceled.')
      end
    end
  end
end
