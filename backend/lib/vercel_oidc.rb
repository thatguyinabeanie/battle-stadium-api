require "net/http"
require "uri"
require "json"
require "jwt"

class VercelOidc
  JWKS_URL = "https://oidc.vercel.com/.well-known/jwks".freeze

  class << self
    def decode_token(request:)
      Rails.logger.info("Verifying Vercel OIDC token")
      # token = request.headers["Authorization"]&.split("Bearer ")&.last
      token = nil

      if token.nil?
        return nil
      end

      begin
        jwks = fetch_jwks
        verify_jwt(token, jwks)
      rescue JWT::DecodeError, JWT::VerificationError => e
        Rails.logger.error("JWT verification failed: #{e.message}")
        nil
      end
    end

    private

    def fetch_jwks
      uri = URI.parse(JWKS_URL)
      response = Net::HTTP.get_response(uri)
      raise "Failed to fetch JWKS" unless response.is_a?(Net::HTTPSuccess)

      JSON.parse(response.body)
    end

    def verify_jwt(token, jwks)
      jwk_loader = lambda do |options|
        kid = options[:kid]
        jwk = jwks["keys"].find { |key| key["kid"] == kid }
        raise JWT::VerificationError, "Key not found" unless jwk

        JWT::JWK.import(jwk)
      end

      decoded_token = JWT.decode(token, nil, true, {
        algorithms: ["RS256"],
        jwks: jwk_loader,
        iss: "https://oidc.vercel.com",
        verify_iss: true,
        aud: "https://vercel.com/#{ENV['VERCEL_TEAM_ID']}",
        verify_aud: true,
        sub: "owner:#{ENV['VERCEL_TEAM_SLUG']}:project:#{ENV['VERCEL_PROJECT_NAME']}:environment:#{Rails.env}",
        verify_sub: true
      })

      decoded_token.first
    end
  end
end
