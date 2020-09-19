class CancelTransferRequest
  include Interactor

  def call
    context.team.reset_transfer!
  end
end
