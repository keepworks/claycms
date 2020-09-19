class Team < ApplicationRecord
  include Transferable

  validates :name, presence: true

  belongs_to :transfer_owner, class_name: 'User', inverse_of: :transferable_teams, optional: true

  has_many :projects, dependent: :destroy
  has_many :team_memberships, dependent: :destroy

  has_many :users, through: :team_memberships
end
