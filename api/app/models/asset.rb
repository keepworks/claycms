class Asset < ApplicationRecord
  serialize :file_data, JSON

  include AssetFileUploader::Attachment.new(:file)

  belongs_to :project

  has_many :properties, dependent: :nullify

  validates :name, presence: true
  validates :file, presence: true

  def metadata
    file&.metadata
  end

  def resolve_url_for(field)
    return resolve_original_file if (field.settings && field.settings['versions']).blank?

    versions = { original: file_url(options) }
    field.settings['versions'].each do |version|
      versions[version['name']] = file_url(version['name'], options)
    end

    versions
  end

  def resolve_original_file
    file_url(options)
  end

  def options
    { public: true }
  end
end
