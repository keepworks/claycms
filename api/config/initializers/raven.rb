Raven.configure do |config|
  config.silence_ready = true
  config.dsn = Credentials.get(:sentry_dsn)
  config.environments = %w[staging production]
  config.excluded_exceptions = [
    Interactor::Failure
  ]
end
