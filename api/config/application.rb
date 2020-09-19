require_relative 'boot'

require 'rails/all'
# # Pick the frameworks you want:
# require 'active_model/railtie'
# require 'active_job/railtie'
# require 'active_record/railtie'
# require 'active_storage/engine'
# require 'action_controller/railtie'
# require 'action_mailer/railtie'
# require 'action_view/railtie'
# require 'action_cable/engine'
require 'rails_semantic_logger'
# # require 'sprockets/railtie'

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module ClayCMS
  class Application < Rails::Application
    # Initialize configuration defaults for originally generated Rails version.
    config.load_defaults 5.2

    # Settings in config/environments/* take precedence over those specified here.
    # Application configuration can go into files in config/initializers
    # -- all .rb files in that directory are automatically loaded after loading
    # the framework and any gems in your application.

    # Only loads a smaller set of middleware suitable for API only apps.
    # Middleware like session, flash, cookies can be added back manually.
    # Skip views, helpers and assets when generating a new resource.
    # config.api_only = true

    config.eager_load_paths += Dir["#{config.root}/app/graphql/resolvers/**/"]
    config.eager_load_paths += Dir["#{config.root}/app/graphql/mutators/**/"]
    config.eager_load_paths += Dir["#{config.root}/app/graphql/functions/**/"]

    config.middleware.delete ApolloUploadServer::Middleware
  end
end
