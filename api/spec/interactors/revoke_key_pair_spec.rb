require 'rails_helper'

RSpec.describe RevokeKeyPair, type: :interactor do
  describe '.call' do
    it 'must expire the key_pair' do
      @result = RevokeKeyPair.call(key_pair: create(:key_pair))

      expect(@result).to be_a_success
      expect(@result.key_pair.expires_at).to be_present
    end

    it 'triggers #revoke! on the key_pair' do
      key_pair = double(key_pair)

      expect(key_pair).to receive(:revoke!)
      RevokeKeyPair.call(key_pair: key_pair)
    end
  end
end
