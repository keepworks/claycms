class ResourceFileUploader < BaseUploader
  BASE_FOLDER = 'resources'.freeze

  plugin :add_metadata
  plugin :remote_url, max_size: 20 * 1024 * 1024
  plugin :upload_options,
         cache: ->(io, **) { { cache_control: "max-age=#{1.year}, s-maxage=#{1.year}" } },
         store: ->(io, context) { { acl: 'public-read' } }

  add_metadata do |io, context|
    metadata = {}
    mime_type = Shrine.determine_mime_type(io)
    metadata[:extension] = Shrine.infer_extension(mime_type)

    metadata
  end

  def generate_location(io, record: nil, **context) # rubocop:disable Lint/UnusedMethodArgument
    "#{BASE_FOLDER}/#{record.project.uid}/file/#{record.name}"
  end
end
