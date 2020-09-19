class SsoLogout
  include Interactor

  def call
    jti = context.decoded_token['jti']
    context.response = context.current_user.auth_tokens.where(jti: jti).delete_all != 0
  end
end
