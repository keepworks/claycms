class AssetsResolver < ApplicationResolver
  parameter :projectId, types.ID

  def resolve
    parent = resolved_object || Project.find(params[:project_id])
    authorize! parent, :view_assets?

    parent.assets
  end
end
