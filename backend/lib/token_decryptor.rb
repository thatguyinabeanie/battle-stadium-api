require 'json/jwt'
# lib/token_decryptor.rb

class TokenDecryptor
  def self.decrypt(token, secret = ENV.fetch('AUTH_SECRET', nil))
    jwt = JSON::JWT.decode(token, secret)
    jwt.plain_text
  rescue StandardError => e
    Rails.logger.error "Failed to decrypt token: #{e.message}"
    nil
  end
end
