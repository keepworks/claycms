require 'rails_helper'

RSpec.describe AuthenticateUser, type: :interactor do
  describe '.call' do
    before do
      stub_const('ENV', { 'HMAC_SECRET' => '123' })
      @user = create(:user, email: 'test@keepworks.com')
      @aud = 'desktop'
      @jti = AuthToken.generate_uniq_jti
    end

    def generate_token(user_id: nil, exp: nil)
      JsonWebToken.encode(user_id: user_id, exp: exp, jti: @jti, aud: @aud)
    end

    context 'valid token' do
      it 'should suceed and return user' do
        AuthToken.create!(jti: @jti, aud: @aud, user: @user)
        bearer_token = generate_token(user_id: @user.id, exp: (Time.current + 1.month).to_i)

        context = AuthenticateUser.call(bearer_token: bearer_token)

        expect(context).to be_a_success
        expect(context.user).to be_present
      end
    end

    context 'invalid token' do
      it 'should fail and return expired session when token has expired' do
        AuthToken.create!(jti: @jti, aud: @aud, user: @user)
        bearer_token = generate_token(user_id: @user.id, exp: (Time.current - 1.month).to_i)

        context = AuthenticateUser.call(bearer_token: bearer_token)

        expect(context).to be_a_failure
        expect(context.error).to eq 'Your session has expired. Please login again to continue.'
      end

      it 'should fail and return expired session when token has been revoked' do
        bearer_token = generate_token(user_id: @user.id, exp: (Time.current + 1.month).to_i)

        context = AuthenticateUser.call(bearer_token: bearer_token)

        expect(context).to be_a_failure
        expect(context.error).to eq 'Your session has expired. Please login again to continue.'
      end

      it 'should fail and return user not found when user is not present' do
        AuthToken.create!(jti: @jti, aud: @aud, user: @user)
        bearer_token = generate_token(user_id: 'random-id', exp: (Time.current + 1.month).to_i)

        context = AuthenticateUser.call(bearer_token: bearer_token)

        expect(context).to be_a_failure
        expect(context.error).to eq 'User not found'
      end
    end
  end
end
