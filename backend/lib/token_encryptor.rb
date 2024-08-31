require 'json/jwt'
# lib/token_encryptor.rb

class TokenEncryptor
  def self.encrypt(payload, secret = ENV.fetch('AUTH_SECRET', nil))
    JSON::JWT.new(payload).sign(secret, :HS512).to_s
  rescue StandardError => e
    Rails.logger.error "Failed to encrypt token: #{e.message}"
    nil
  end
end
