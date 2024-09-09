require "clerk"

Clerk.configure do |c|
  c.api_key = ENV["CLERK_SECRET_KEY"]
  c.base_url = "https://api.clerk.com"
  c.logger = Logger.new(STDOUT) # if omitted, no logging
  c.middleware_cache_store = ActiveSupport::Cache::FileStore.new("/tmp/clerk_middleware_cache")
end
