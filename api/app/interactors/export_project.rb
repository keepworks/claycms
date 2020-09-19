class ExportProject
  include Interactor

  def call
    ActiveRecord::Base.transaction do
      check_pending_export
      create_export_instance
      initiate_export
    end
  end

  def check_pending_export
    context.fail!(error: 'You have a pending export.') if context.project.exports.pending.present?
  end

  def create_export_instance
    context.export = context.project.exports.create
  end

  def initiate_export
    ExportProjectPublisher.publish({ project_id: context.project.id, export_id: context.export.id })
  end
end
