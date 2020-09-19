class UpdateProjectMutator < ApplicationMutator
  UpdateProjectInputType = GraphQL::InputObjectType.define do
    name 'UpdateProjectInput'

    parameter :name, !types.String
  end

  parameter :id, !types.ID
  parameter :input, !UpdateProjectInputType

  type Types::ProjectType.to_non_null_type

  def mutate
    project = Project.find(params[:id])
    authorize! project, :update?

    result = UpdateProject.call!(params: permitted_params, project: project)
    result.project
  end
end
