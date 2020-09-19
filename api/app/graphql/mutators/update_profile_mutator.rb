class UpdateProfileMutator < ApplicationMutator
  UpdateProfileInputType = GraphQL::InputObjectType.define do
    name 'UpdateProfileInput'

    parameter :firstName, types.String
    parameter :lastName, types.String
    parameter :profilePicture, Scalars::FileType
  end

  parameter :input, !UpdateProfileInputType

  type Types::UserType.to_non_null_type

  def mutate
    result = UpdateUser.call!(params: permitted_params, user: context[:current_user])

    result.user
  end
end
