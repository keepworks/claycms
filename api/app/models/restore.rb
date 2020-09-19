class Restore < ApplicationRecord
  enum status: { pending: 0, completed: 1, failed: 2 }

  belongs_to :project

  validates :status, presence: true
  validates :url, presence: true
end
