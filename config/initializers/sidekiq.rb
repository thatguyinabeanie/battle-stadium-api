def configure_sidekiq(env_var_name: "REDIS_URL")
  url = ENV.fetch(env_var_name) { raise "Missing environment variable: #{env_var_name}" }

  Sidekiq.configure_server do |config|
    config.redis = { url:}
  end

  Sidekiq.configure_client do |config|
    config.redis = { url: }
  end
end

if Rails.env.test?
  require "sidekiq/testing"
  Sidekiq::Testing.inline!
else
  configure_sidekiq(env_var_name: Rails.env.production? ? "PROD_REDIS_URL" : "REDIS_URL")
end
