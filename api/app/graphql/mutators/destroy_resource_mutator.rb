class DestroyResourceMutator < ApplicationMutator
  parameter :id, !types.ID

  type Types::ResourceType.to_non_null_type

  def mutate
    resource = Resource.find(params[:id])
    authorize! resource, :destroy?

    result = DestroyResource.call!(resource: resource)
    result.resource
  end
end
