class RecordsResolver < ApplicationResolver
  parameter :entityId, types.ID
  parameter :filter, types.String
  parameter :projectId, types.ID

  def resolve
    if search_params_is_present?
      project = Project.find(params[:project_id])
      authorize! project, :view?

      return filtered_records
    end

    entity = resolved_object || Entity.find(params[:entity_id])
    authorize! entity, :view?

    entity.records
  end

  def search_params_is_present?
    params[:filter].present? &&
      params[:project_id].present?
  end

  def filtered_records
    Search.scope(
      query: params[:filter],
      scope: 'record',
      project_id: params[:project_id]
    )
  end
end
