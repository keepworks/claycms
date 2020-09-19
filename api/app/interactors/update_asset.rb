class UpdateAsset
  include Interactor

  def call
    context.asset.update!(context.params)
  end
end
