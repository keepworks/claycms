class CreateTeamMembershipMutator < ApplicationMutator
  CreateTeamMembershipInputType = GraphQL::InputObjectType.define do
    name 'CreateTeamMembershipInput'

    parameter :teamId, !types.ID
    parameter :email, !types.String
    parameter :role, !types.String
  end

  parameter :input, !CreateTeamMembershipInputType

  type Types::TeamMembershipType.to_non_null_type

  def mutate
    team = Team.find(permitted_params[:team_id])
    authorize! team, :create_team_membership?

    result = CreateTeamMembership.call!(params: permitted_params, team: team)
    result.team_membership
  end
end
