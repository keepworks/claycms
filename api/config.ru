# This file is used by Rack-based servers to start the application.

require_relative 'config/environment'

require 'rack/cors'

use Rack::Deflater

use Rack::Cors do
  allow do
    origins '*'
    resource '*', headers: :any, methods: [:get, :post, :put, :patch, :delete, :options, :head]
  end
end

use Rack::CanonicalHost, ENV['API_HOST'], force_ssl: ENV['FORCE_SSL'].present?

run Rails.application
