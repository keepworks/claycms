class KeyPair < ApplicationRecord
  PUBLIC_KEY_LENGTH = 24

  belongs_to :project

  validates :public_key, presence: true, uniqueness: true

  before_validation :set_keys, on: :create

  def self.generate_public_key
    generate_key(:public_key, PUBLIC_KEY_LENGTH)
  end

  private_class_method def self.generate_key(key_attribute, key_length)
    loop do
      digest = SecureRandom.base58(key_length)
      break digest unless exists?(key_attribute => digest)
    end
  end

  def revoke!
    self.expires_at ||= Time.current
    save!
  end

  protected

  def set_keys
    self.public_key ||= self.class.generate_public_key
  end
end
