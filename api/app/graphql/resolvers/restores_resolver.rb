class RestoresResolver < ApplicationResolver
  parameter :projectId, types.ID

  def resolve
    parent = resolved_object || Project.find(params[:project_id])
    authorize! parent, :view_imports?

    parent.restores.order(created_at: :desc)
  end
end
