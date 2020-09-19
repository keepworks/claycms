class ExportFileUploader < BaseUploader
  plugin :remote_url, max_size: 20 * 1024 * 1024
  plugin :upload_options, store: ->(io, **) { { acl: 'public-read' } }
end
