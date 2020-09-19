class CreateTeamMembership
  include Interactor

  def call
    ActiveRecord::Base.transaction do
      validate_role
      find_or_create_user
      create_team_membership
    end
  end

  protected

  def validate_role
    return if context.params[:role] != 'owner'

    context.fail!(error: 'Role cannot be owner.')
  end

  def find_or_create_user
    context.user = User.find_or_create_by!(email: context.params[:email])
  end

  def create_team_membership
    team_membership = context.team.team_memberships.find_by(user: context.user)

    context.fail!(error: 'Email is already added to the team.') if team_membership.present?

    context.team_membership = context.team.team_memberships.create!(
      user: context.user,
      role: context.params[:role]
    )
  end
end
