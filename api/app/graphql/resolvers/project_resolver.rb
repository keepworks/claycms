class ProjectResolver < ApplicationResolver
  parameter :id, !types.ID

  def resolve
    project = Project.find(params[:id])
    authorize! project, :view?

    project
  end
end
