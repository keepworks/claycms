class SsoCallback
  include Interactor

  def call
    verify_payload
    find_user
    build_payload
  end

  private

  def verify_payload
    url_decoded_sso_payload = CGI.unescape context.params[:sso]
    raise Exceptions::Unauthorized, 'Invalid Signature' unless valid_signature?(url_decoded_sso_payload)

    sso_payload = Base64.decode64(url_decoded_sso_payload)
    context.query_params = extract_query_params(sso_payload)

    raise Exceptions::Unauthorized, 'Missing required params' unless required_params_present?
    raise Exceptions::Unauthorized, 'Request Expired' if nonce_expired?(context.query_params[:nonce])
  end

  def valid_signature?(sso_payload)
    ActiveSupport::SecurityUtils.secure_compare(
      OpenSSL::HMAC.hexdigest(
        'SHA256',
        ENV['CLAY_SSO_SECRET'],
        sso_payload
      ),
      context.params[:sig]
    )
  end

  def extract_query_params(sso_payload)
    query_hash = Rack::Utils.parse_nested_query sso_payload
    query_hash.transform_keys(&:to_sym)
  end

  def nonce_expired?(nonce)
    nonce = AuthNonce.find_by(nonce: nonce)
    return true if nonce.blank?

    nonce.expired?
  end

  def required_params_present?
    context.query_params[:nonce].present? && context.query_params[:email].present?
  end

  def find_user
    user = User.find_by(email: context.query_params[:email])
    raise Exceptions::Unauthorized, 'User not found' unless user

    user.update external_uid: context.query_params[:external_uid].presence
    context.user = user
  end

  def build_payload
    jti = AuthToken.generate_uniq_jti
    aud = DeviceDetector.new(context.user_agent)&.device_type || 'desktop'

    context.sso_payload = {
      token: JsonWebToken.encode(
        user_id: context.user.id,
        exp: (Time.current + 1.month).to_i,
        jti: jti,
        aud: aud
      )
    }

    AuthToken.create!(jti: jti, aud: aud, user: context.user)
  end
end
