class Export < ApplicationRecord
  serialize :file_data, JSON

  include ExportFileUploader::Attachment.new(:file)

  enum status: { pending: 0, completed: 1, failed: 2 }

  belongs_to :project

  validates :status, presence: true
end
