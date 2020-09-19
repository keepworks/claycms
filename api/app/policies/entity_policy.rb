class EntityPolicy < BaseMemberPolicy
  def view?
    team_membership&.atleast?(:developer)
  end

  def update?
    team_membership&.atleast?(:developer)
  end

  def destroy?
    team_membership&.atleast?(:developer)
  end

  def create_field?
    team_membership&.atleast?(:developer)
  end

  def create_record?
    team_membership&.atleast?(:editor)
  end

  alias clone_record? create_record?

  protected

  def team
    @team ||= record.project.team
  end
end
