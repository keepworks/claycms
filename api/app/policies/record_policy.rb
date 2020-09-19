class RecordPolicy < BaseMemberPolicy
  def view?
    team_membership&.atleast?(:editor)
  end

  def update?
    team_membership&.atleast?(:editor)
  end

  def destroy?
    team_membership&.atleast?(:editor)
  end

  protected

  def team
    @team ||= record.entity.project.team
  end
end
