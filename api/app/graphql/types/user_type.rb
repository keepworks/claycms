module Types
  class UserType < ApplicationType
    model_class User

    attribute :first_name
    attribute :last_name
    attribute :email

    file_field :profile_picture, :thumbnail
    file_field :profile_picture, :normal

    relationship :team_memberships
  end
end
