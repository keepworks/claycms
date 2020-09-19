class AuthenticateUser
  include Interactor

  def call
    decode_auth_token
    find_user
    validate_token
  end

  protected

  def decode_auth_token
    @decoded_token = JsonWebToken.decode(context.bearer_token)
  rescue JWT::ExpiredSignature
    context.fail!(error: 'Your session has expired. Please login again to continue.')
  end

  def find_user
    context.user = User.find_by(id: @decoded_token['user_id'])
    context.fail!(error: 'User not found') unless context.user
  end

  def validate_token
    revoked = AuthToken.revoked?(
      user: context.user,
      jti: @decoded_token['jti']
    )
    context.fail!(error: 'Your session has expired. Please login again to continue.') if revoked
  end
end
