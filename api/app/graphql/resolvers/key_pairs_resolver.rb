class KeyPairsResolver < ApplicationResolver
  parameter :projectId, types.ID

  def resolve
    parent = resolved_object || Project.find(params[:project_id])
    authorize! parent, :view_key_pairs?

    parent.key_pairs
  end
end
