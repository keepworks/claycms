require 'rails_helper'

RSpec.describe KeyPair, type: :model do
  describe 'validations' do
    it { is_expected.to validate_uniqueness_of(:public_key) }
  end

  describe 'callbacks' do
    it 'sets public_key on creation' do
      key_pair = create(:key_pair, public_key: nil)

      expect(key_pair.public_key).to be_present
    end
  end

  describe '.generate_public_key' do
    it 'returns a key 24 characters long' do
      key = KeyPair.generate_public_key

      expect(key.length).to eq(24)
    end
  end

  describe '#revoke!' do
    it 'sets expires_at to now' do
      key_pair = create(:key_pair, expires_at: nil)

      revoke_time = Time.current + 5.days

      Timecop.freeze(revoke_time)

      key_pair.revoke!

      expect(key_pair.expires_at).to eq(revoke_time)

      Timecop.return
    end

    it 'does not overwrite expires_at if already set' do
      previous_revoke_time = Time.current
      revoke_time = Time.current + 5.days

      key_pair = create(:key_pair, expires_at: previous_revoke_time)

      Timecop.freeze(revoke_time)

      key_pair.revoke!

      expect(key_pair.expires_at).to eq(previous_revoke_time)

      Timecop.return
    end
  end
end
