class FieldsResolver < ApplicationResolver
  parameter :entityId, types.ID
  parameter :projectId, types.ID
  parameter :filter, types.String

  def resolve
    # For search
    if search_params_is_present?
      project = Project.find(params[:project_id])
      authorize! project, :view?

      return filtered_fields
    end

    entity = resolved_object || Entity.find(params[:entity_id])
    authorize! entity, :view?

    entity.nested_fields
  end

  def search_params_is_present?
    params[:filter].present? &&
      params[:project_id].present?
  end

  def filtered_fields
    Search.scope(
      query: params[:filter],
      scope: 'field',
      project_id: params[:project_id]
    )
  end
end
