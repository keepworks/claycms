class UpdateResourceMutator < ApplicationMutator
  UpdateResourceInputType = GraphQL::InputObjectType.define do
    name 'UpdateResourceInput'

    parameter :file, Scalars::FileType.to_non_null_type
  end

  parameter :id, !types.ID
  parameter :input, !UpdateResourceInputType

  type Types::ResourceType.to_non_null_type

  def mutate
    resource = Resource.find(params[:id])
    authorize! resource, :update?

    result = UpdateResource.call!(params: permitted_params, resource: resource)
    result.resource
  end
end
