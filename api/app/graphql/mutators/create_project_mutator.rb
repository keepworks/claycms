class CreateProjectMutator < ApplicationMutator
  CreateProjectInputType = GraphQL::InputObjectType.define do
    name 'CreateProjectInput'

    parameter :teamId, !types.ID
    parameter :name, !types.String
  end

  parameter :input, !CreateProjectInputType

  type Types::ProjectType.to_non_null_type

  def mutate
    team = Team.find(permitted_params[:team_id])
    authorize! team, :create_project?

    result = CreateProject.call!(params: permitted_params, team: team)
    result.project
  end
end
