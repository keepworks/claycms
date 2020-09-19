class RejectTransferRequest
  include Interactor

  def call
    ActiveRecord::Base.transaction do
      verify_transfer_request
      reject_transfer_request
    end
  end

  def verify_transfer_request
    context.fail!(error: 'Your transfer link has either expired or been canceled.') if !context.team.transfer_requested?
  end

  def reject_transfer_request
    context.team.reset_transfer!
  end
end
