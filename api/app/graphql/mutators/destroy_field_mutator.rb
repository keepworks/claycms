class DestroyFieldMutator < ApplicationMutator
  parameter :id, !types.ID

  type Types::FieldType.to_non_null_type

  def mutate
    field = Field.find(params[:id])
    authorize! field, :destroy?

    result = DestroyField.call!(field: field)
    result.field
  end
end
