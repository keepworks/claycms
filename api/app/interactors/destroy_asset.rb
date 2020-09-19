class DestroyAsset
  include Interactor

  def call
    context.asset.destroy!
  end
end
