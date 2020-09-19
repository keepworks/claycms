class BaseMemberPolicy < ApplicationPolicy
  protected

  def team
    raise 'must be overridden'
  end

  def team_membership
    return if user.blank? || team.blank?

    @team_membership ||= TeamMembership.find_by(user: user, team: team)
  end
end
