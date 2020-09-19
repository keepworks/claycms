class EmailFormatValidator < ActiveModel::EachValidator
  def validate_each(record, attribute, value)
    return if value.blank? || MailAddress.valid_email?(value)

    record.errors[attribute] << (options[:message] || 'is not a valid email')
  end
end
