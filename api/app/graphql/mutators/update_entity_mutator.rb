class UpdateEntityMutator < ApplicationMutator
  UpdateEntityInputType = GraphQL::InputObjectType.define do
    name 'UpdateEntityInput'

    parameter :parentId, types.ID
    parameter :name, !types.String
    parameter :label, !types.String
    parameter :singleton, types.Boolean
  end

  parameter :id, !types.ID
  parameter :input, !UpdateEntityInputType

  type Types::EntityType.to_non_null_type

  def mutate
    entity = Entity.find(params[:id])
    authorize! entity, :update?

    if permitted_params[:parent_id].present?
      parent = Entity.find(permitted_params[:parent_id])
      authorize! parent, :update?
    end

    result = UpdateEntity.call!(params: permitted_params, entity: entity)
    result.entity
  end
end
