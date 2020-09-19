module URL
  def self.valid?(value)
    url = begin
            URI.parse(value)
          rescue StandardError
            false
          end
    url.is_a?(URI::HTTP) || url.is_a?(URI::HTTPS)
  end
end
