class EntityResolver < ApplicationResolver
  parameter :id, !types.ID

  def resolve
    entity = Entity.find(params[:id])
    authorize! entity, :view?

    entity
  end
end
