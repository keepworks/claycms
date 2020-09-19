class ExportProjectPublisher < BasePublisher
  to_queue 'export_project'
end
