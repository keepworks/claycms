class User < ApplicationRecord
  serialize :profile_picture_data, JSON

  include ProfilePictureUploader::Attachment.new(:profile_picture)

  validates :email, presence: true, email_format: true, uniqueness: { case_sensitive: false }
  validates :first_name, presence: true
  validates :last_name, presence: true

  has_many :auth_tokens, dependent: :destroy
  has_many :team_memberships, dependent: :destroy
  has_many :transferable_teams, class_name: 'Team', foreign_key: :transfer_owner, inverse_of: :transfer_owner, dependent: :nullify

  has_many :teams, through: :team_memberships
end
