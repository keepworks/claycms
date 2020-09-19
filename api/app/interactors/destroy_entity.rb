class DestroyEntity
  include Interactor

  def call
    context.entity.destroy!
  end
end
