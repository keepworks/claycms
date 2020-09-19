module GbLogger
  class Formatter < SemanticLogger::Formatters::Default
    def initialize(time_format: :iso_8601, log_host: true, log_application: true, precision: PRECISION)
      super(time_format: time_format, log_host: log_host, log_application: log_application, precision: precision)
    end

    def status_code
      # Payload Example: '{ :path=>"/graphql" :status=>200, :status_message=>"OK" }'
      status_code_match = payload.match(/:status=>([0-9]*),/) if payload
      return '' unless status_code_match

      status_code_match.captures[0].to_s
    end

    def method
      # Message Example: '-- Completed #configure_logging'
      # Where configure_logging is the desired method
      method_match = message.match(/^--\sCompleted\s#(\w+)$/) if message
      return '' unless method_match

      method_match.captures[0].to_s
    end

    def service_name
      ENV['SERVICE_NAME'] || ''
    end

    def pod_name
      ENV['POD_NAME'] || ''
    end

    def subscriber
      ''
    end

    def device
      ''
    end

    def level
      log.level.upcase || ''
    end

    def thread
      "[#{log.thread_name}]" || ''
    end

    def file
      name
    end

    def line
      '0'
    end

    def call(log, logger)
      self.log = log
      self.logger = logger

      [time, service_name, pod_name, subscriber, device, level, file, thread, method, line, status_code, message, payload, exception].compact.join(' ')
    end
  end
end
