class Credentials < Rails::Railtie
  def self.get(*args)
    Rails.application.credentials.dig(Rails.env.to_sym, *args)
  end
end
