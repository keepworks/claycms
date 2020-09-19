class DestroyRecordMutator < ApplicationMutator
  parameter :id, !types.ID

  type Types::RecordType.to_non_null_type

  def mutate
    record = Record.find(params[:id])
    authorize! record, :destroy?

    result = DestroyRecord.call!(record: record)
    result.record
  end
end
