# lib/token_decryptor.rb

require 'json/jwt'

class TokenDecryptor
  def self.decrypt(token, secret = ENV.fetch('AUTH_SECRET', nil))
    # First, try to parse the token as a JWE
    jwe = JSON::JWT.decode(token, secret)

    # If it's a JWE, the payload is already decrypted
    if jwe.is_a?(JSON::JWE)
      return jwe.plain_text
    end
    # If it's not a JWE, it might be a regular JWT
    jwe
  rescue JSON::JWT::InvalidFormat
    # If it's not a valid JWE/JWT, try decoding it as a plain JWT
    begin
      hs256 = JSON::JWT.decode(token, secret, :HS256)
    rescue StandardError => e
      nil
    end
  rescue StandardError => e
    Rails.logger.error "Failed to decrypt token: #{e.message}"
    nil
  end
end
