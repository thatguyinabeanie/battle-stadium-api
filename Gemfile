source "https://rubygems.org"

# Specify your Ruby version
ruby "3.3.5"

# Rails framework
gem "active_model_serializers", "~> 0"
gem "bootsnap", ">= 1.4.4", require: false
gem "rails", "~> 7.2"
gem "sprockets-rails"
gem "stimulus-rails", "~> 1"
gem "turbo-rails", "~> 2"

# Authentication and Authorization
gem "bcrypt", "~> 3"
gem "jwt", "~> 2.8"
gem "pundit"

# Database and ORM
gem "friendly_id"
gem "kaminari"
gem "kredis", "~> 1"
gem "pg", "~> 1.5.7"

# API and Serialization
gem "json", "~> 2.7"
gem "jsonapi-serializer", "~> 2"
gem "rswag-api"
gem "rswag-ui"
gem "versionist", "~> 2"

# Background Jobs
gem "sidekiq", "~> 7"

# Security
gem "openssl", "~> 3.2"
gem "rack-attack", "~> 6"
gem "rack-cors", "~> 2"

# Utilities
gem "awesome_print"
gem "dotenv-rails"
gem "ostruct", "~> 0"
gem "parallel", "~> 1.26"
gem "retries"
gem "svix"
gem "typhoeus", "~> 1.4"
gem "uri", "~> 0.13.1"

# Redis
gem "redis", "~> 5"
gem "redis-namespace"
gem "redis-rails"

# Development Tools
gem "rb-readline"
gem "ruby-lsp"
gem "traceroute", "~> 0"

# Platform-specific
gem "tzinfo-data", platforms: %i[windows jruby]

# Web Server
gem "puma", "~> 6.5"

group :development do
  gem "rails-erd"
  gem "web-console", "~> 4"
end

group :test do
  gem "brakeman", "~> 6", require: false
  gem "bundler-audit", "~> 0"
  gem "factory_bot_rails", "~> 6"
  gem "rails-controller-testing", "~> 1"
  gem "rspec_junit_formatter", "~> 0"
  gem "ruby_audit", "~> 2", require: false
  gem "selenium-webdriver", "~> 4", require: false
  gem "shoulda-matchers", "~> 6"
  gem "simplecov",  "~> 0.22.0"
  gem "simplecov-cobertura", require: false
  gem "simplecov-console", require: false
  gem "simplecov-lcov", require: false
  gem "timecop", "~> 0"
end

group :development, :test do
  gem "debug", "~> 1"
  gem "faker", "~> 3"
  gem "listen", "~> 3.3"
  gem "parallel_tests", "~> 4"
  gem "rspec-json_expectations"
  gem "rspec-rails"
  gem "ruby-lsp-rails", "~> 0.3.15"
  gem "ruby-lsp-rspec"
  gem "spring", "~> 4"
  gem "webmock", "~> 3"
end

group :development, :test, :rubocop do
  gem "rswag-specs"
  gem "rubocop"
  gem "rubocop-checkstyle_formatter"
  gem "rubocop-erb"
  gem "rubocop-factory_bot"
  gem "rubocop-git"
  gem "rubocop-github"
  gem "rubocop-graphql"
  gem "rubocop-junit-formatter"
  gem "rubocop-md"
  gem "rubocop-packaging"
  gem "rubocop-performance"
  gem "rubocop-rails"
  gem "rubocop-rails_config"
  gem "rubocop-rails_deprecation"
  gem "rubocop-rake"
  gem "rubocop-rspec"
  gem "rubocop-rspec_rails"
  gem "rubocop-rubycw"
  gem "rubocop-shopify"
  gem "rubocop-thread_safety"
end
