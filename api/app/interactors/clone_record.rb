class CloneRecord
  include Interactor

  def call
    context.record = context.record.amoeba_dup
    context.record.save!(validate: false)
  end
end
