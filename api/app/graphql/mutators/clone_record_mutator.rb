class CloneRecordMutator < ApplicationMutator
  parameter :id, !types.ID

  type Types::RecordType.to_non_null_type

  def mutate
    record = Record.find(params[:id])
    authorize! record.entity, :clone_record?

    context = CloneRecord.call(record: record)
    context.record
  end
end
