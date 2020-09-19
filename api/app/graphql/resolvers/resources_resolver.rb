class ResourcesResolver < ApplicationResolver
  parameter :projectId, types.ID

  def resolve
    parent = resolved_object || Project.find(params[:project_id])
    authorize! parent, :view_resources?

    parent.resources
  end
end
