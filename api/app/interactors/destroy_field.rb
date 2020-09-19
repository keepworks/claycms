class DestroyField
  include Interactor

  def call
    context.field.destroy!
  end
end
