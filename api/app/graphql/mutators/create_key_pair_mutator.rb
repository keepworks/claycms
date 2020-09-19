class CreateKeyPairMutator < ApplicationMutator
  CreateKeyPairInputType = GraphQL::InputObjectType.define do
    name 'CreateKeyPairInput'

    parameter :projectId, !types.ID
  end

  parameter :input, !CreateKeyPairInputType

  type Types::KeyPairType.to_non_null_type

  def mutate
    project = Project.find(permitted_params[:project_id])
    authorize! project, :create_key_pair?

    result = CreateKeyPair.call!(project: project)
    result.key_pair
  end
end
