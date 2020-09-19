class DestroyResource
  include Interactor

  def call
    context.resource.destroy!
  end
end
