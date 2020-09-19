module Token
  def self.encode(id, digest)
    Base64.urlsafe_encode64("#{id}:#{digest}")
  end

  def self.decode(token)
    begin
      decoded_token = Base64.urlsafe_decode64(token)
    rescue ArgumentError
      return
    end

    (decoded_token || '').split(':')
  end
end
