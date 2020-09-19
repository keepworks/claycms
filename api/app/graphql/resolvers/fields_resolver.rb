class FieldsResolver < ApplicationResolver
  parameter :entityId, types.ID

  def resolve
    entity = resolved_object || Entity.find(params[:entity_id])
    authorize! entity, :view?

    entity.nested_fields
  end
end
