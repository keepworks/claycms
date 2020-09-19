class ProjectPolicy < BaseMemberPolicy
  def view?
    team_membership.present?
  end

  def view_assets?
    view?
  end

  def view_resources?
    view?
  end

  def view_exports?
    view?
  end

  def view_imports?
    view?
  end

  def export_project?
    team_membership&.atleast?(:manager)
  end

  def import_project?
    team_membership&.atleast?(:manager)
  end

  def view_key_pairs?
    team_membership&.atleast?(:developer)
  end

  def view_entities?
    team_membership&.atleast?(:developer)
  end

  def create_asset?
    team_membership&.atleast?(:editor)
  end

  def create_resource?
    team_membership&.atleast?(:editor)
  end

  def create_key_pair?
    team_membership&.atleast?(:developer)
  end

  def create_entity?
    team_membership&.atleast?(:developer)
  end

  def update?
    team_membership&.atleast?(:developer)
  end

  protected

  def team
    @team ||= record.team
  end
end
