class ProjectsResolver < ApplicationResolver
  sortable
  pageable

  parameter :teamId, !types.ID

  def resolve
    team = Team.find(params[:team_id])
    authorize! team, :view_projects?

    sorted_and_paged(team.projects)
  end
end
