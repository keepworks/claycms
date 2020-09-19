class TeamMembershipsResolver < ApplicationResolver
  pageable

  parameter :teamId, types.ID

  def resolve
    parent_object = resolved_object || context[:current_user].teams.find(params[:team_id])
    authorize! parent_object, :view_team_memberships?

    paged(parent_object.team_memberships)
  end
end
