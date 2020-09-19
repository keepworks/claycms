module Transferable
  extend ActiveSupport::Concern

  include Tokenable

  TRANSFER_EXPIRY_PERIOD = 3.days

  included do
    has_token :transfer
  end

  def request_transfer_to!(user)
    self.transfer_digest = self.class.generate_transfer_digest
    self.transfer_generated_at = Time.zone.now
    self.transfer_owner = user

    save!
  end

  def reset_transfer!
    self.transfer_digest = nil
    self.transfer_generated_at = nil
    self.transfer_owner = nil

    save!
  end

  def transfer_expired?
    transfer_generated_at.present? && (Time.zone.now - transfer_generated_at > TRANSFER_EXPIRY_PERIOD)
  end

  def transfer_requested?
    transfer_owner.present? && !transfer_expired?
  end
end
