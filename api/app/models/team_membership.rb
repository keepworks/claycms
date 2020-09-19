class TeamMembership < ApplicationRecord
  enum role: { editor: 0, developer: 1, manager: 2, owner: 3 }

  belongs_to :team
  belongs_to :user

  validates :role, presence: true
  validates :user, uniqueness: { scope: :team_id }

  validate :only_one_owner_role_per_team

  def atleast?(allowed_role)
    allowed_role_level = self.class.roles[allowed_role.to_s]
    raise "Unknown role: #{allowed_role}" if allowed_role_level.blank?

    current_role_level = self.class.roles[role.to_s]

    current_role_level >= allowed_role_level
  end

  protected

  def only_one_owner_role_per_team
    return if !role_changed?(to: 'owner') || team.blank? || user.blank?

    owner_membership = self.class.find_by(team: team, role: :owner)
    errors.add(:role, 'cannot be owner as the team already has one') if owner_membership.present? && owner_membership.user != user
  end
end
