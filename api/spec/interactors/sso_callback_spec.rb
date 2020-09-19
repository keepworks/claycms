require 'rails_helper'

RSpec.describe SsoCallback, type: :interactor do
  describe '.call' do
    before do
      stub_const('ENV', { 'CLAY_SSO_SECRET' => '123', 'CLAY_SSO_URL' => 'http://localhost:3000'})
      @user = create(:user, email: 'test@keepworks.com')
      @user_agent = 'Mozilla/5.0 (Windows NT 6.2; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/30.0.1599.17 Safari/537.36'
    end

    def generate_nonce(time = Time.current)
      nonce = AuthNonce.generate_uniq_nonce
      @nonce = AuthNonce.create!(
        nonce: nonce,
        expires_at: time + AuthNonce::NONCE_EXPIRY_PERIOD
      ).nonce
    end

    def build_payload
      sso_raw = "nonce=#{@nonce}&email=test@keepworks.com&external_id=1"
      b64sso = Base64.encode64(sso_raw)
      @sso = CGI.escape(b64sso)
      @sig = OpenSSL::HMAC.hexdigest('SHA256', ENV['CLAY_SSO_SECRET'], b64sso)
    end

    it 'should suceed and return token' do
      generate_nonce
      build_payload

      params = { sso: @sso, sig: @sig }
      context = SsoCallback.call(
        params: params,
        user_agent: @user_agent
      )

      expect(context).to be_a_success
      expect(context.sso_payload[:token]).to be_present
    end

    it 'should throw an error if nonce has expired' do
      generate_nonce(Time.current - 10.minutes)
      build_payload

      params = { sso: @sso, sig: @sig }

      expect { SsoCallback.call(params: params, user_agent: @user_agent) }.to raise_error(Exceptions::Unauthorized, 'Request Expired')
    end

    it 'should throw an error if signature mismatches' do
      generate_nonce
      build_payload
      @sig = OpenSSL::HMAC.hexdigest('SHA256', 'random secret', 'random payload')
      params = { sso: @sso, sig: @sig }

      expect { SsoCallback.call(params: params, user_agent: @user_agent) }.to raise_error(Exceptions::Unauthorized, 'Invalid Signature')
    end

    it 'should create a record in AuthToken table' do
      generate_nonce
      build_payload
      params = { sso: @sso, sig: @sig }

      expect { SsoCallback.call(params: params, user_agent: @user_agent) }.to change { AuthToken.count }.by(1)
    end
  end
end
