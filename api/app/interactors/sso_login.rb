class SsoLogin
  include Interactor

  def call
    generate_nonce
    generate_sso
    generate_sig
    build_payload
  end

  private

  def generate_nonce
    nonce = AuthNonce.generate_uniq_nonce
    context.nonce = AuthNonce.create!(
      nonce: nonce,
      expires_at: Time.current + AuthNonce::NONCE_EXPIRY_PERIOD
    ).nonce
  end

  def generate_sso
    context.base64_encoded_sso = Base64.encode64("nonce=#{context.nonce}")
    context.url_encoded_sso = CGI.escape context.base64_encoded_sso
  end

  def generate_sig
    context.sig = OpenSSL::HMAC.hexdigest('SHA256', ENV['CLAY_SSO_SECRET'], context.base64_encoded_sso)
  end

  def build_payload
    sso_url = "#{ENV['CLAY_SSO_URL']}?sso=#{context.url_encoded_sso}&sig=#{context.sig}"
    context.sso_payload = { sso_url: sso_url }
  end
end
