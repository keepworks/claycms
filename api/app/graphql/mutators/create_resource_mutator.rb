class CreateResourceMutator < ApplicationMutator
  CreateResourceInputType = GraphQL::InputObjectType.define do
    name 'CreateResourceInput'

    parameter :projectId, !types.ID
    parameter :name, !types.String
    parameter :file, Scalars::FileType.to_non_null_type
  end

  parameter :input, !CreateResourceInputType

  type Types::ResourceType.to_non_null_type

  def mutate
    project = Project.find(permitted_params[:project_id])
    authorize! project, :create_resource?

    result = CreateResource.call!(params: permitted_params, project: project)
    result.resource
  end
end
