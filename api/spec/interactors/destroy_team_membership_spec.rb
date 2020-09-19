require 'rails_helper'

RSpec.describe DestroyTeamMembership, type: :interactor do
  describe '.call' do
    it 'must fail if team membership role is owner' do
      result = DestroyTeamMembership.call(team_membership: create(:team_membership, role: :owner))

      expect(result).to be_a_failure
      expect(result.error).to eq('Owner cannot be deleted.')
    end

    it 'must destroy the team membership' do
      result = DestroyTeamMembership.call(team_membership: create(:team_membership))

      expect(result).to be_a_success
      expect(result.team_membership).to be_destroyed
    end

    it 'must clean up pending transfer requests' do
      team_membership = create(:team_membership)
      team_membership.team.request_transfer_to!(team_membership.user)

      result = DestroyTeamMembership.call(team_membership: team_membership)

      expect(result).to be_a_success
      expect(result.team_membership).to be_destroyed
      expect(result.team_membership.team.transfer_owner).to be_nil
      expect(result.team_membership.team.transfer_digest).to be_nil
      expect(result.team_membership.team.transfer_generated_at).to be_nil
    end
  end
end
