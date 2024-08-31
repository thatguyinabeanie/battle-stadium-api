require 'json/jwt'
# lib/token_decryptor.rb

class TokenDecryptor
  def self.decrypt(token, secret = ENV.fetch('AUTH_SECRET', nil))
    JSON::JWT.decode(token, secret, :HS512)
  rescue StandardError => e
    Rails.logger.error "Failed to decrypt token: #{e.message}"
    throw e
  end
end
