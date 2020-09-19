class CurrentUserResolver < ApplicationResolver
  type Types::UserType.to_non_null_type

  def resolve
    context[:current_user]
  end
end
