class CreateFieldMutator < ApplicationMutator
  CreateFieldInputType = GraphQL::InputObjectType.define do
    name 'CreateFieldInput'

    parameter :entityId, !types.ID
    parameter :name, !types.String
    parameter :label, !types.String
    parameter :dataType, !types.String
    parameter :elementType, types.String
    parameter :referencedEntityId, types.ID
    parameter :defaultValue, types.String
    parameter :hint, types.String
    parameter :position, types.Int
    parameter :children, types[Scalars::HashType]
    parameter :validations, Scalars::HashType
    parameter :settings, Scalars::HashType
  end

  parameter :input, !CreateFieldInputType

  type Types::FieldType.to_list_type.to_non_null_type

  def mutate
    entity = Entity.find(permitted_params[:entity_id])
    authorize! entity, :create_field?

    result = CreateField.call!(params: permitted_params, entity: entity)
    result.field.self_and_descendants
  end
end
