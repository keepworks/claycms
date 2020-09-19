class UpdateAssetMutator < ApplicationMutator
  UpdateAssetInputType = GraphQL::InputObjectType.define do
    name 'UpdateAssetInput'

    parameter :name, !types.String
  end

  parameter :id, !types.ID
  parameter :input, !UpdateAssetInputType

  type Types::AssetType.to_non_null_type

  def mutate
    asset = Asset.find(params[:id])
    authorize! asset, :update?

    result = UpdateAsset.call!(params: permitted_params, asset: asset)
    result.asset
  end
end
