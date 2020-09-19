module Uid
  extend ActiveSupport::Concern

  included do
    validates :uid, presence: true

    after_initialize :set_uid, if: :new_record?
  end

  protected

  def set_uid
    self.uid ||= SecureRandom.uuid
  end
end
