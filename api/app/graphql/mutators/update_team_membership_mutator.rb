class UpdateTeamMembershipMutator < ApplicationMutator
  UpdateTeamMembershipInputType = GraphQL::InputObjectType.define do
    name 'UpdateTeamMembershipInput'

    parameter :role, !types.String
  end

  parameter :id, !types.ID
  parameter :input, !UpdateTeamMembershipInputType

  type Types::TeamMembershipType.to_non_null_type

  def mutate
    team_membership = TeamMembership.find(params[:id])
    authorize! team_membership, :update?

    result = UpdateTeamMembership.call!(params: permitted_params, team_membership: team_membership)
    result.team_membership
  end
end
