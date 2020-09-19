class FieldPolicy < BaseMemberPolicy
  def view?
    team_membership&.atleast?(:developer)
  end

  def update?
    team_membership&.atleast?(:developer)
  end

  def destroy?
    team_membership&.atleast?(:developer)
  end

  protected

  def team
    @team ||= record.entity.project.team
  end
end
