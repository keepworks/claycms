module Types
  class TeamMembershipType < ApplicationType
    model_class TeamMembership

    attribute :role

    relationship :team
    relationship :user
  end
end
