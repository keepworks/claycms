class AuthToken < ApplicationRecord
  validates :jti, presence: true, uniqueness: true
  validates :aud, presence: true

  belongs_to :user

  def self.revoked?(user: nil, jti: nil)
    !user.auth_tokens.exists?(jti: jti)
  end

  def self.generate_uniq_jti
    loop do
      jti_raw = [ENV['HMAC_SECRET'], Time.current.to_i].join(':').to_s
      jti = Digest::MD5.hexdigest(jti_raw)
      break jti unless exists?(jti: jti)
    end
  end
end
