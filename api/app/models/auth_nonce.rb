class AuthNonce < ApplicationRecord
  validates :nonce, presence: true, uniqueness: true
  validates :expires_at, presence: true

  NONCE_EXPIRY_PERIOD = 5.minutes

  def expired?
    expires_at < Time.current
  end

  def self.generate_uniq_nonce
    loop do
      key = SecureRandom.hex(32)
      nonce = ActionController::HttpAuthentication::Digest.nonce(key)
      break nonce unless exists?(nonce: nonce)
    end
  end
end
