# Safer subclass of Mail::Address with convenience methods
class MailAddress < Mail::Address
  EMAIL_REGEX = /\A[^@\s]+@[^@\s]+\z/.freeze

  def self.valid_email?(value)
    (value =~ EMAIL_REGEX) != nil
  end
end
