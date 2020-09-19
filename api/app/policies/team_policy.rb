class TeamPolicy < BaseMemberPolicy
  def view?
    team_membership.present?
  end

  def view_team_memberships?
    view?
  end

  def view_projects?
    view?
  end

  def update?
    team_membership&.atleast?(:owner)
  end

  def destroy?
    update?
  end

  def create_team_membership?
    team_membership&.atleast?(:manager)
  end

  def create_project?
    team_membership&.atleast?(:manager)
  end

  def create_transfer_request?
    team_membership&.atleast?(:owner)
  end

  def cancel_transfer_request?
    team_membership&.atleast?(:owner)
  end

  def accept_transfer_request?
    team_membership.present? && user.id == team.transfer_owner_id
  end

  def reject_transfer_request?
    accept_transfer_request?
  end

  protected

  def team
    @team ||= record
  end
end
