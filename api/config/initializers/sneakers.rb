require 'sneakers/metrics/logging_metrics'

Sneakers.configure({
  amqp: RabbitMq.connection_url,
  metrics: Sneakers::Metrics::LoggingMetrics.new,
  env: ENV['RAILS_ENV'],
  threads: 1,
  worker: 1
})

Sneakers.logger.level = Logger::INFO # the default DEBUG is too noisy
