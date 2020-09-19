class RecordsResolver < ApplicationResolver
  parameter :entityId, types.ID

  def resolve
    entity = resolved_object || Entity.find(params[:entity_id])
    authorize! entity, :view?

    entity.records
  end
end
