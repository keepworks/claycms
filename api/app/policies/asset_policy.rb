class AssetPolicy < BaseMemberPolicy
  def update?
    team_membership&.atleast?(:manager)
  end

  def destroy?
    team_membership&.atleast?(:manager)
  end

  protected

  def team
    @team ||= record.project.team
  end
end
