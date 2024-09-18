require_relative "boot"

require "rails/all"
require "dotenv"
require "kaminari"
require "friendly_id"

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module BattleStadium
  class Application < Rails::Application
    # Initialize configuration defaults for originally generated Rails version.
    config.load_defaults 7.1

    config.before_configuration do
      env_file = ".env"
      Dotenv.load(env_file) if File.exist?(env_file)

      # puts 'Loading .env.postgres file'
      env_postgres_file = "../.env.postgres"
      Dotenv.load(env_postgres_file) if File.exist?(env_postgres_file)

      env_development_local = "../.env.development.local"
      Dotenv.load(env_development_local) if File.exist?(env_development_local)

      require "socket"
      hostname = Socket.gethostname

      ENV["POSTGRES_HOST"] = hostname == "rails-api-container" ? "postgres" : "localhost"
      ENV["DATABASE_URL"] = nil

      errors = []

      errors << "Missing CLERK_SECRET_KEY environment variable" if ENV.fetch("CLERK_SECRET_KEY", nil).nil?

      errors << "Missing CLERK_WEBHOOK_SECRET environment variable" if ENV.fetch("CLERK_WEBHOOK_SECRET", nil).nil?

      errors << "Missing CLERK_PUBLISHABLE_KEY environment variable" if ENV.fetch("CLERK_PUBLISHABLE_KEY", nil).nil?

      errors << "Missing PRODUCTION_DATABASE_URL environment variable" if ENV.fetch("PRODUCTION_DATABASE_URL", nil).nil? && Rails.env.production?

      errors << "Missing AUTH_SECRET environment variable" if ENV.fetch("AUTH_SECRET", nil).nil?

      puts errors.join("\n") if errors.any?
    end

    # Please, add to the `ignore` list any other `lib` subdirectories that do
    # not contain `.rb` files, or that should not be reloaded or eager loaded.
    # Common ones are `templates`, `generators`, or `middleware`, for example.
    config.autoload_lib(ignore: %w[assets tasks])
    config.autoload_paths << Rails.root.join("app/serializers")

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
  end
end
