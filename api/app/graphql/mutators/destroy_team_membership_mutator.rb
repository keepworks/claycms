class DestroyTeamMembershipMutator < ApplicationMutator
  parameter :id, !types.ID

  type Types::TeamMembershipType.to_non_null_type

  def mutate
    team_membership = TeamMembership.find(params[:id])
    authorize! team_membership, :destroy?

    result = DestroyTeamMembership.call!(team_membership: team_membership)
    result.team_membership
  end
end
