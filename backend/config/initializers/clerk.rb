Clerk.configure do |c|
  c.api_key = ENV.fetch("CLERK_SECRET_KEY", nil)
  c.base_url = "https://api.clerk.com/v1/"
  c.logger = Logger.new(STDOUT) # if omitted, no logging
  c.middleware_cache_store = Rails.cache # if omitted: no caching
end
