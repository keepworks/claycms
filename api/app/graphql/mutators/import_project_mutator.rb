class ImportProjectMutator < ApplicationMutator
  ImportProjectInputType = GraphQL::InputObjectType.define do
    name 'ImportProjectInput'

    parameter :url, !types.String
  end

  parameter :id, !types.ID
  parameter :input, !ImportProjectInputType

  type Types::RestoreType.to_non_null_type

  def mutate
    project = Project.find(params[:id])
    authorize! project, :import_project?

    result = ImportProject.call(project: project, params: permitted_params)
    result.restore
  end
end
