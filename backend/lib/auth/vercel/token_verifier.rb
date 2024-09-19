# lib/vercel/token_verifier.rb

require 'net/http'
require 'uri'
require 'json'
require 'jwt'

module Auth
  module Vercel
    module TokenVerifier
      class NoAuthorizationHeader < StandardError; end
      class VerificationError < StandardError; end


      class << self
        @jwks_cache = nil

        def verify_token(request: )
          token = request.headers["Authorization"]&.split(",")&.first.split("Bearer ")&.last

          raise NoAuthorizationHeader, "Authorization header missing or malformed" unless token

          jwks = fetch_jwks
          jwk_loader = ->(options) { jwks['keys'] }

          begin
            JWT.decode(token, nil, true, {
              algorithms: ['RS256'],
              jwks: jwk_loader,
              iss: ENV['ISSUER'],
              verify_iss: true,
              aud: ENV['AUDIENCE'],
              verify_aud: true,
              sub: "#{ENV['SUBJECT']}:#{Rails.env.production? ? 'production' : 'development'}",
              verify_sub: true
            })
          rescue JWT::DecodeError => e
            raise "Unauthorized: Failed Vercel OIDC Authentication - #{e.message}"
          end
        end

        private

        def fetch_jwks
          return @jwks_cache if @jwks_cache

          uri = URI.parse(ENV['JWKS_URL'])
          response = Net::HTTP.get_response(uri)
          raise "Failed to fetch JWKS: #{response.message}" unless response.is_a?(Net::HTTPSuccess)

          @jwks_cache = JSON.parse(response.body)
        end
      end
    end
  end
end

# Example usage:
# token = 'your_jwt_token_here'
# begin
#   if Vercel::TokenVerifier.verify_token(token)
#     puts 'Token is valid'
#   end
# rescue => e
#   puts e.message
# end
