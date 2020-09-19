require 'rails_helper'

RSpec.describe RejectTransferRequest, type: :interactor do
  describe '.call' do
    before do
      @owner = create(:user)
      @user = create(:user)
      @team = create(:team)
      @owner_team_membership = create(:team_membership, team: @team, user: @owner, role: :owner)
      @user_team_membership = create(:team_membership, team: @team, user: @user, role: :editor)
    end

    context 'with transfer request' do
      before do
        @transfer_time = Time.zone.today

        @team.request_transfer_to!(@user)
      end

      context 'which has not expired' do
        before do
          @result = RejectTransferRequest.call(team: @team)
        end

        it 'is successful' do
          expect(@result).to be_a_success
        end

        it 'does not transfer ownership and roles stay the same' do
          expect(@owner_team_membership.reload.role).to eq('owner')
          expect(@user_team_membership.reload.role).to eq('editor')
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
          @result = RejectTransferRequest.call(team: @team)
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
        @result = RejectTransferRequest.call(team: @team)
      end

      it 'is failure' do
        expect(@result).to be_a_failure
        expect(@result.error).to eq('Your transfer link has either expired or been canceled.')
      end
    end
  end
end
