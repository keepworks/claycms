module Types
  class TeamType < ApplicationType
    model_class Team

    attribute :name
    field :isTransferRequested, Boolean, null: false, method: :transfer_requested?

    relationship :transfer_owner
    relationship :team_memberships
  end
end
