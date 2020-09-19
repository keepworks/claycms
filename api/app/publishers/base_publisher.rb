class BasePublisher
  def self.publish(message = {})
    exchange.publish(message.to_json, routing_key: @queue)
  end

  def self.channel
    @channel ||= connection.create_channel
  end

  def self.connection
    @connection ||= Bunny.new(RabbitMq.connection_url).tap(&:start)
  end

  def self.exchange
    @exchange ||= channel.default_exchange
  end

  def self.to_queue(name)
    @queue = name
  end
end
