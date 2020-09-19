class KeyPairPolicy < BaseMemberPolicy
  def revoke?
    team_membership&.atleast?(:developer)
  end

  protected

  def team
    @team ||= record.project.team
  end
end
