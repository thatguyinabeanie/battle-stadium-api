require_relative 'boot'

require 'rails/all'

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

# Load .env file in development and test environments
Dotenv::Rails.load if Rails.env.local? || Rails.env.development? || Rails.env.test?
ENV['DB_HOST'] ||= ENV.fetch('DEV_ENVIRONMENT', 'localhost') == 'devcontainer' ? 'db' : 'localhost'

module BattleStadium
  class Application < Rails::Application
    # Initialize configuration defaults for originally generated Rails version.
    config.load_defaults 7.1

    # Please, add to the `ignore` list any other `lib` subdirectories that do
    # not contain `.rb` files, or that should not be reloaded or eager loaded.
    # Common ones are `templates`, `generators`, or `middleware`, for example.
    config.autoload_lib(ignore: %w[assets tasks])
    # config.autoload_paths << Rails.root.join('lib')
    config.autoload_paths << Rails.root.join('app/serializer')

    # Configuration for the application, engines, and railties goes here.
    #
    # These settings can be overridden in specific environments using the files
    # in config/environments, which are processed later.
    #
    # config.time_zone = "Central Time (US & Canada)"
    # config.eager_load_paths << Rails.root.join("extras")

    # Only loads a smaller set of middleware suitable for API only apps.
    # Middleware like session, flash, cookies can be added back manually.
    # Skip views, helpers and assets when generating a new resource.
    config.api_only = true

    # config.middleware.insert_before 0, Rack::Cors do
    #   allow do
    #     origins 'https://your-allowed-domain.com' # Replace with your production domain
    #     resource '*', headers: :any, methods: %i[get post put patch delete]
    #   end
    # end
  end
end