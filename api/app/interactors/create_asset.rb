class CreateAsset
  include Interactor

  def call
    context.asset = context.project.assets.create!(context.params)
  end
end
