class ImportProject
  include Interactor

  def call
    ActiveRecord::Base.transaction do
      check_pending_restore
      initialize_restore
      initiate_restore_worker
    end
  end

  def check_pending_restore
    context.fail!(error: 'Previous import is running. It may take a while to finish.') if context.project.restores.pending.present?
  end

  def initialize_restore
    context.restore = context.project.restores.create(url: context.params[:url])
  end

  def initiate_restore_worker
    ImportProjectPublisher.publish({ project_id: context.project.id, restore_id: context.restore.id })
  end
end
