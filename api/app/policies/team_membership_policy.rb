class TeamMembershipPolicy < BaseMemberPolicy
  def update?
    return false if record.owner?

    team_membership&.atleast?(:manager)
  end

  def destroy?
    update?
  end

  protected

  def team
    @team ||= record.team
  end
end
