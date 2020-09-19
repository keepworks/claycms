class CreateAssetMutator < ApplicationMutator
  CreateAssetInputType = GraphQL::InputObjectType.define do
    name 'CreateAssetInput'

    parameter :projectId, !types.ID
    parameter :name, !types.String
    parameter :file, Scalars::FileType.to_non_null_type
  end

  parameter :input, !CreateAssetInputType

  type Types::AssetType.to_non_null_type

  def mutate
    project = Project.find(permitted_params[:project_id])
    authorize! project, :create_asset?

    result = CreateAsset.call!(params: permitted_params, project: project)
    result.asset
  end
end
