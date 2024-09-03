# lib/token_encryptor.rb
require 'json/jwt'

module JsonWebToken
  def self.decrypt(token, secret = ENV.fetch('AUTH_SECRET', nil))
    # First, try to parse the token as a JWE
    jwe = JSON::JWT.decode(token, secret)

    # If it's a JWE, the payload is already decrypted
    return jwe.plain_text if jwe.is_a?(JSON::JWE)

    # If it's not a JWE, it might be a regular JWT
    jwe
  rescue JSON::JWT::InvalidFormat
    # If it's not a valid JWE/JWT, try decoding it as a plain JWT
    begin
      JSON::JWT.decode(token, secret, :HS256)
    rescue StandardError
      nil
    end
  rescue StandardError => e
    Rails.logger.error "Failed to decrypt token: #{e.message}"
    nil
  end

  def self.encrypt(payload, secret = ENV.fetch('AUTH_SECRET', nil))
    JSON::JWT.new(payload).sign(secret, :HS512).to_s
  rescue StandardError => e
    Rails.logger.error "Failed to encrypt token: #{e.message}"
    nil
  end
end
