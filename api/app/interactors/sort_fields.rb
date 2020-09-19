class SortFields
  include Interactor

  def call
    ActiveRecord::Base.transaction do
      update_fields
    end
  end

  protected

  def update_fields
    context.fields.each(&:save!)
  end
end
