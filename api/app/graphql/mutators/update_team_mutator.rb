class UpdateTeamMutator < ApplicationMutator
  UpdateTeamInputType = GraphQL::InputObjectType.define do
    name 'UpdateTeamInput'

    parameter :name, !types.String
  end

  parameter :id, !types.ID
  parameter :input, !UpdateTeamInputType

  type Types::TeamType.to_non_null_type

  def mutate
    team = Team.find(params[:id])
    authorize! team, :update?

    result = UpdateTeam.call!(params: permitted_params, team: team)
    result.team
  end
end
