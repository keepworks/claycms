class CreateTeamMutator < ApplicationMutator
  CreateTeamInputType = GraphQL::InputObjectType.define do
    name 'CreateTeamInput'

    parameter :name, !types.String
  end

  parameter :input, !CreateTeamInputType

  type Types::TeamType.to_non_null_type

  def mutate
    result = CreateTeam.call!(team_params: permitted_params, current_user: context[:current_user])
    result.team
  end
end
