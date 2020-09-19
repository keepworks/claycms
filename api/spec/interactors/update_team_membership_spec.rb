require 'rails_helper'

RSpec.describe UpdateTeamMembership, type: :interactor do
  describe '.call' do
    before(:each) do
      @team_membership = create(:team_membership, role: :editor)
    end

    context 'when the new role is owner' do
      before do
        @params = {
          role: 'owner'
        }
        @result = UpdateTeamMembership.call(team_membership: @team_membership, params: @params)
      end

      it 'is failure' do
        expect(@result).to be_a_failure
        expect(@result.error).to eq('Role cannot be owner.')
      end
    end

    context 'when the new role is not owner' do
      before do
        @params = {
          role: 'editor'
        }

        @result = UpdateTeamMembership.call(team_membership: @team_membership, params: @params)
      end

      it 'is success' do
        expect(@result).to be_a_success
      end

      it 'must update the team membership with the give role' do
        expect(@result.team_membership).to be_present
        expect(@result.team_membership.role).to eq('editor')
      end
    end
  end
end
