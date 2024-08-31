require 'json/jwt'
# lib/token_decryptor.rb
require 'json/jwt'

class TokenDecryptor
  def self.decrypt(token, secret = ENV['AUTH_SECRET'] )
    begin
      jwt = JSON::JWT.decode(token, secret)
      jwt.plain_text
    rescue => e
      Rails.logger.error "Failed to decrypt token: #{e.message}"
      nil
    end
  end
end
