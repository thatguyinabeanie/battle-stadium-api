# config/initializers/omniauth.rb
Rails.application.config.middleware.use OmniAuth::Builder do
  provider :discord, ENV.fetch('DISCORD_CLIENT_ID', nil), ENV.fetch('DISCORD_CLIENT_SECRET', nil), scope: 'identify email'
  provider :google_oauth2, ENV.fetch('GOOGLE_CLIENT_ID', nil), ENV.fetch('GOOGLE_CLIENT_SECRET', nil), scope: 'email,profile'
  provider :facebook, ENV.fetch('FACEBOOK_APP_ID', nil), ENV.fetch('FACEBOOK_APP_SECRET', nil), scope: 'email'
end
