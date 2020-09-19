require 'rails_helper'

RSpec.describe SsoLogin, type: :interactor do
  describe '.call' do
    before do
      stub_const('ENV', { 'CLAY_SSO_SECRET' => '123', 'CLAY_SSO_URL' => 'http://localhost:3000' })
      @nonce_expire_in = 5
    end

    it 'should succeed and return the sso url' do
      context = SsoLogin.call

      expect(context).to be_a_success
      expect(context.sso_payload[:sso_url]).to be_present
    end

    it 'should create a valid nonce record in AuthNonce table' do
      context = SsoLogin.call
      nonce = AuthNonce.find_by!(nonce: context.nonce)
      expect(nonce.expired?).to be_falsey
      expect { SsoLogin.call }.to change { AuthNonce.count }.by(1)
    end
  end
end
