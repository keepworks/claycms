class RecordResolver < ApplicationResolver
  parameter :recordId, types.ID

  def resolve
    record = Record.find(params[:record_id])
    authorize! record.entity, :view?

    record
  end
end
