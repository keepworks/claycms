Raven.configure do |config|
  config.silence_ready = true
  config.dsn = ENV['SENTRY_DSN']
  config.environments = %w[staging production]
  config.excluded_exceptions = [
    Interactor::Failure
  ]
end
