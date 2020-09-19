class DestroyAssetMutator < ApplicationMutator
  parameter :id, !types.ID

  type Types::AssetType.to_non_null_type

  def mutate
    asset = Asset.find(params[:id])
    authorize! asset, :destroy?

    result = DestroyAsset.call!(asset: asset)
    result.asset
  end
end
