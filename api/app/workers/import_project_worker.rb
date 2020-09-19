class ImportProjectWorker
  include Sneakers::Worker
  from_queue 'import_project'

  def work(msg)
    obj = JSON.parse(msg, symbolize_names: true)

    project = Project.find(obj[:project_id])
    restore = Restore.find(obj[:restore_id])

    return ack! if restore.completed?

    begin
      PerformRestore.call!(project: project, restore: restore)
    rescue StandardError => e
      restore.failed!

      logger.info "Failed to import #{msg}"
      logger.info e

      return reject!
    end

    ack!
  end
end
