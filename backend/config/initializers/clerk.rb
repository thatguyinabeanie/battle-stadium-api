require "clerk"

Clerk.configure do |c|
  Rails.logger.info("Using CLERK_SECRET_KEY from environment variable") if ENV.fetch("CLERK_SECRET_KEY", nil).present?

  Rails.logger.info("Using NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY from environment variable") if ENV.fetch("NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY", nil).present?

  Rails.logger.info("Using CLERK_PUBLISHABLE_KEY from environment variable") if ENV.fetch("CLERK_PUBLISHABLE_KEY", nil).present?

  c.logger = Logger.new(STDOUT) # if omitted, no logging
  c.middleware_cache_store = ActiveSupport::Cache::FileStore.new("/tmp/clerk_middleware_cache") # if omitted: no caching
  # c.excluded_routes ["/foo", "/bar/*"]
end
