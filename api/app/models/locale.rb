class Locale < ApplicationRecord
  validates :language, presence: true

  belongs_to :project
end
