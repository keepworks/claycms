class SsoLogoutMutator < ApplicationMutator
  type Types::ResponseType.to_non_null_type

  def mutate
    bearer_token = @context.current_request.headers['Authorization'].split(' ').last
    decoded_token = JsonWebToken.decode(bearer_token)

    context = SsoLogout.call!(
      current_user: @context[:current_user],
      decoded_token: decoded_token
    )

    { success: context.response }
  end
end
