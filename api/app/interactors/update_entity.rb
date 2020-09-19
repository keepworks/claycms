class UpdateEntity
  include Interactor

  def call
    context.entity.update!(context.params)
  end
end
