class DestroyTeamMembership
  include Interactor

  def call
    ActiveRecord::Base.transaction do
      verify_team_membership
      destroy_team_membership
      clean_up_transfer_requests
    end
  end

  def verify_team_membership
    context.fail!(error: 'Owner cannot be deleted.') if context.team_membership.owner?
  end

  def destroy_team_membership
    context.team_membership.destroy!
  end

  def clean_up_transfer_requests
    team = context.team_membership.team
    team.reset_transfer! if team.transfer_owner_id == context.team_membership.user_id
  end
end
