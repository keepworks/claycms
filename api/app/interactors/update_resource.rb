class UpdateResource
  include Interactor

  def call
    context.resource.update!(context.params)
  end
end
