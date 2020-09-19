class ExportProjectMutator < ApplicationMutator
  parameter :id, !types.ID

  type Types::ExportType.to_non_null_type

  def mutate
    project = Project.find(params[:id])
    authorize! project, :export_project?

    result = ExportProject.call(project: project)
    result.export
  end
end
