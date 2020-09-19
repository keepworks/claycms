class Resource < ApplicationRecord
  serialize :file_data, JSON

  include ResourceFileUploader::Attachment.new(:file)

  belongs_to :project

  validates :name, presence: true, uniqueness: { scope: :project }
  validates :file, presence: true

  def resolve_file
    file_url(options)
  end

  def options
    { public: true }
  end
end
