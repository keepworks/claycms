class DestroyRecord
  include Interactor

  def call
    context.record.destroy!
  end
end
