class JsonWebToken
  def self.encode(payload = {})
    JWT.encode(payload, ENV['HMAC_SECRET'], 'HS256')
  end

  def self.decode(token)
    JWT.decode(token, ENV['HMAC_SECRET'], true, { algorithm: 'HS256' })[0]
  end
end
