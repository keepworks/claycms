class UpdateRecordMutator < ApplicationMutator
  UpdateRecordInputType = GraphQL::InputObjectType.define do
    name 'UpdateRecordInput'

    parameter :traits, Scalars::HashType
  end

  parameter :id, !types.ID
  parameter :input, !UpdateRecordInputType

  type Types::RecordType.to_non_null_type

  def mutate
    record = Record.find(params[:id])
    authorize! record, :update?

    result = UpdateRecord.call!(params: permitted_params, record: record)
    result.record
  end
end
