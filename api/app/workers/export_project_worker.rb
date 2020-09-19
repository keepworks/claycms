class ExportProjectWorker
  include Sneakers::Worker
  from_queue 'export_project'

  def work(msg)
    obj = JSON.parse(msg, symbolize_names: true)

    project = Project.find(obj[:project_id])
    export = Export.find(obj[:export_id])

    return ack! if export.completed?

    begin
      PerformExport.call!(project: project, export: export)
    rescue StandardError => e
      export.failed!

      logger.info "Failed to export #{msg}"
      logger.info e

      return reject!
    end

    ack!
  end
end
