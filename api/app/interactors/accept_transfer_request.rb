class AcceptTransferRequest
  include Interactor

  def call
    ActiveRecord::Base.transaction do
      verify_transfer_request
      accept_transfer_request
    end
  end

  def verify_transfer_request
    context.fail!(error: 'Your transfer link has either expired or been canceled.') if !context.team.transfer_requested?
  end

  def accept_transfer_request
    old_owner_membership = context.team.team_memberships.find_by(role: :owner)
    new_owner_membership = context.team.team_memberships.find_by(user_id: context.team.transfer_owner_id)

    old_owner_membership.update!(role: :manager)
    new_owner_membership.update!(role: :owner)

    context.team.reset_transfer!
  end
end
