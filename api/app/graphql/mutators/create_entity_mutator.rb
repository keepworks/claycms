class CreateEntityMutator < ApplicationMutator
  CreateEntityInputType = GraphQL::InputObjectType.define do
    name 'CreateEntityInput'

    parameter :projectId, !types.ID
    parameter :parentId, types.ID
    parameter :name, !types.String
    parameter :label, !types.String
    parameter :singleton, types.Boolean
  end

  parameter :input, !CreateEntityInputType

  type Types::EntityType.to_non_null_type

  def mutate
    project = Project.find(permitted_params[:project_id])
    authorize! project, :create_entity?

    if permitted_params[:parent_id].present?
      entity = Entity.find(permitted_params[:parent_id])
      authorize! entity, :update?
    end

    result = CreateEntity.call!(params: permitted_params, project: project)
    result.entity
  end
end
