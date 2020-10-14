class SortEntitiesMutator < ApplicationMutator
  SortEntityInputType = GraphQL::InputObjectType.define do
    name 'SortEntityInput'

    parameter :id, !types.ID
    parameter :position, !types.Int
  end

  SortEntitiesInputType = GraphQL::InputObjectType.define do
    name 'SortEntitiesInput'

    parameter :entities, !types[SortEntityInputType]
  end

  parameter :input, !SortEntitiesInputType

  type Types::EntityType.to_list_type

  def mutate
    entity_id_position_mapping = permitted_params[:entities].inject({}) do |mapping, entity_params|
      mapping[entity_params[:id]] = entity_params[:position]
    end

    entity_ids = entity_id_position_mapping.keys
    entities = Entity.where(id: entity_ids)

    entities = entities.map do |entity|
      authorize! entity, :update?

      entity.position = entity_id_position_mapping[entity.id]
      entity
    end

    result = SortEntities.call!(entities: entities)
    result.entities
  end
end
