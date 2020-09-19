class AppUrl
  def self.build(path = '', query = {})
    options = { host: ENV['APP_HOST'], port: ENV['APP_PORT'], path: path, query: query.presence && query.to_query }
    builder_class = options[:port] == '443' ? URI::HTTPS : URI::HTTP
    builder_class.build(options).to_s
  end
end
