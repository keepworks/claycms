url_options = {
  host: ENV['ASSET_HOST']
}

if Rails.env.production? || Rails.env.staging?
  require 'shrine/storage/s3'

  s3_options = {
    access_key_id: Credentials.get(:aws_access_key_id),
    secret_access_key: Credentials.get(:aws_secret_access_key),
    region: Credentials.get(:s3_region),
    bucket: Credentials.get(:s3_bucket)
  }

  Shrine.storages = {
    cache: Shrine::Storage::S3.new(prefix: 'cache', **s3_options),
    store: Shrine::Storage::S3.new(**s3_options)
  }
elsif Rails.env.test?
  require 'shrine/storage/memory'

  Shrine.storages = {
    cache: Shrine::Storage::Memory.new,
    store: Shrine::Storage::Memory.new
  }
else
  require 'shrine/storage/file_system'

  Shrine.storages = {
    cache: Shrine::Storage::FileSystem.new('public', prefix: 'uploads/cache'),
    store: Shrine::Storage::FileSystem.new('public', prefix: 'uploads')
  }

  Shrine.logger = Rails.logger
  Shrine.plugin :instrumentation
end

Shrine.plugin :activerecord
Shrine.plugin :determine_mime_type
Shrine.plugin :infer_extension, force: true
Shrine.plugin :derivatives, versions_compatibility: true
Shrine.plugin :url_options, cache: url_options, store: url_options

class Shrine::Attacher
  def promote(*)
    create_derivatives
    super
  end
end
