class ReferencedEntitiesResolver < ApplicationResolver
  parameter :entityId, types.ID

  type Types::EntityType.to_list_type

  def resolve
    entity = Entity.find(params[:entity_id])
    authorize! entity.project, :view_entities?

    Entity.where(parent_id: entity.id).or(Entity.where(id: entity.id))
  end
end
