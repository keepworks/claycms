class UpdateFieldMutator < ApplicationMutator
  UpdateFieldInputType = GraphQL::InputObjectType.define do
    name 'UpdateFieldInput'

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

  parameter :id, !types.ID
  parameter :input, !UpdateFieldInputType

  type Types::FieldType.to_list_type.to_non_null_type

  def mutate
    field = Field.find(params[:id])
    authorize! field, :update?

    result = UpdateField.call!(params: permitted_params, field: field)
    result.field.self_and_descendants
  end
end
