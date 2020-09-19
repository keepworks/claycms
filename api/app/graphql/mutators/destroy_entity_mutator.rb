class DestroyEntityMutator < ApplicationMutator
  parameter :id, !types.ID

  type Types::EntityType.to_non_null_type

  def mutate
    entity = Entity.find(params[:id])
    authorize! entity, :destroy?

    result = DestroyEntity.call!(entity: entity)
    result.entity
  end
end
