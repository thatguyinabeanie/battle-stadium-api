Clerk.configure do |c|
  c.api_key = ENV.fetch("CLERK_SECRET_KEY", nil)
  c.base_url = "https://api.clerk.dev/v1/"
  c.publishable_key = ENV.fetch("CLERK_PUBLIC_KEY", nil)
  c.logger = Logger.new(STDOUT) # if omitted, no logging
  c.middleware_cache_store = Rails.cache # if omitted: no caching
end
