module RabbitMq
  def self.connection_url
    ENV['CLOUDAMQP_URL'] || "amqp://#{ENV['RABBIT_HOST']}:#{ENV['RABBIT_PORT']}"
  end
end
