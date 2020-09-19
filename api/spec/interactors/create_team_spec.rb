require 'rails_helper'

RSpec.describe CreateTeam, type: :interactor do
  describe '.call' do
    context 'when given valid params' do
      before do
        @current_user = create(:user)

        valid_params = {
          team_params: { name: 'Valid Company Name' },
          current_user: @current_user
        }

        @result = CreateTeam.call(valid_params)
      end

      it 'is successful' do
        expect(@result).to be_a_success
      end

      it 'must create a team' do
        expect(@result.team).to be_present
        expect(@result.team.name).to eq('Valid Company Name')
      end

      it 'must create a team membership with owner role and normal status' do
        team_memberships = @result.team.team_memberships

        expect(team_memberships.count).to eq(1)
        expect(team_memberships.first.user_id).to eq(@current_user.id)
        expect(team_memberships.first.role).to eq('owner')
      end
    end
  end
end
