class AssetFileUploader < BaseUploader
  plugin :add_metadata
  plugin :remote_url, max_size: 20 * 1024 * 1024
  plugin :upload_options,
         cache: ->(io, **) { { cache_control: "max-age=#{1.year}, s-maxage=#{1.year}" } },
         store: ->(io, **) { { acl: 'public-read' } }

  add_metadata do |io, context|
    metadata = {}
    mime_type = Shrine.determine_mime_type(io)
    metadata[:extension] = Shrine.infer_extension(mime_type)
    metadata
  end

  Attacher.derivatives_processor do |original|
    versions = {}
    pipeline = ImageProcessing::MiniMagick.source(original)
    settings = context[:record].properties.first&.field&.settings || {}
    (settings['versions'] || []).each do |version|
      versions[version['name'].to_sym] = pipeline.resize_to_fill!(version['width'], version['height'], gravity: 'Center')
    end

    versions
  end
end
