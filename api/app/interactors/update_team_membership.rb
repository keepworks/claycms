class UpdateTeamMembership
  include Interactor

  def call
    context.fail!(error: 'Role cannot be owner.') if context.params[:role] == 'owner'

    context.team_membership.update!(context.params)
  end
end
