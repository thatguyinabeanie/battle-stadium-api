require_relative "boot"

require "rails/all"
require "dotenv"

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module BattleStadium
  class Application < Rails::Application
    # Initialize configuration defaults for originally generated Rails version.
    config.load_defaults 7.1

    config.before_configuration do

      puts "Loading ENVIRONMENT VARIABLES"

      env_file = ".env"
      Dotenv.load(env_file) if File.exist?(env_file) && !(Rails.env.production? || Rails.env.staging?)

      # puts 'Loading .env.postgres file'
      env_postgres_file = "../.env.postgres"
      Dotenv.load(env_postgres_file) if File.exist?(env_postgres_file) &&  !(Rails.env.production? || Rails.env.staging?)

      env_development_local = "../.env.development.local"
      Dotenv.load(env_development_local) if File.exist?(env_development_local) &&  !(Rails.env.production? || Rails.env.staging?)

      # if Rails.env.test?
      unless Rails.env.production? || Rails.env.staging?
        require "socket"
        hostname = Socket.gethostname

        ENV["POSTGRES_HOST"] = hostname == "rails-api-container" ? "postgres" : "localhost"
        ENV["DATABASE_URL"] = nil
      end

      errors = []

      errors << "Missing CLERK_SECRET_KEY environment variable" if ENV.fetch("CLERK_SECRET_KEY", nil).nil?

      errors << "Missing CLERK_WEBHOOK_SECRET environment variable" if ENV.fetch("CLERK_WEBHOOK_SECRET", nil).nil?

      errors << "Missing CLERK_PUBLISHABLE_KEY environment variable" if ENV.fetch("CLERK_PUBLISHABLE_KEY", nil).nil?

      errors << "Missing PRODUCTION_DATABASE_URL environment variable" if ENV.fetch("PRODUCTION_DATABASE_URL", nil).nil? && Rails.env.production?

      errors << "Missing STAGING_DATABASE_URL environment variable" if ENV.fetch("PRODUCTION_DATABASE_URL", nil).nil? && Rails.env.staging?

      errors << "Missing AUTH_SECRET environment variable" if ENV.fetch("AUTH_SECRET", nil).nil?

      raise errors.join("\n")       if errors.any?
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

    # config.middleware.insert_before 0, Rack::Cors do
    #   allow do
    #     origins 'https://your-allowed-domain.com' # Replace with your production domain
    #     resource '*', headers: :any, methods: %i[get post put patch delete]
    #   end
    # end
    config.session_store :cookie_store, key: "sessions.battlestadium.gg"
    config.middleware.use ActionDispatch::Cookies
    config.middleware.use ActionDispatch::Session::CookieStore, key: "sessions.battlestadium.gg"

    config.filter_parameters += %i[password password_confirmation email_address email first_name last_name phone_numbers]


    # Clerk.configure do |config|
    #   config.api_key = ENV['NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY']
    #   config.base_url = "https://api.clerk.com"
    #   config.middleware_cache_store = Rails.cache # if omitted: no caching
    # end

  end
end
