class SortFieldsMutator < ApplicationMutator
  SortFieldInputType = GraphQL::InputObjectType.define do
    name 'SortFieldInput'

    parameter :id, !types.ID
    parameter :position, !types.Int
  end

  SortFieldsInputType = GraphQL::InputObjectType.define do
    name 'SortFieldsInput'

    parameter :fields, !types[SortFieldInputType]
  end

  parameter :input, !SortFieldsInputType

  type Types::FieldType.to_list_type

  def mutate
    fields = permitted_params[:fields].map do |field_params|
      field = Field.find(field_params[:id])
      authorize! field, :update?

      field.position = field_params[:position]
      field
    end

    result = SortFields.call!(fields: fields)
    result.fields
  end
end
