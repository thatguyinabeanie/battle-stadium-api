# lib/vercel/token_verifier.rb

require "net/http"
require "uri"
require "json"
require "jwt"

module Auth
  module Vercel
    module TokenVerifier
      class NoAuthorizationHeader < StandardError; end
      class VerificationError < StandardError; end

      class << self

        @jwks_cache = nil

        def verify(request:)
          token = request.headers["X-Vercel-OIDC-Token"]
          raise NoAuthorizationHeader, "X-Vercel-OIDC-Token Header missing or malformed" unless token
          verify_token(token:, request:)
        end

        def verify_token(token:, request:)
          JWT.decode(token, nil, true, {
            algorithms: ["RS256"],
            jwks: ->(options) { jwks["keys"] },
            iss: ENV["ISSUER"],
            verify_iss: true,
            aud: ENV["AUDIENCE"],
            verify_aud: true,
            sub: ENV["SUBJECT"],
            verify_sub: false
          })
        rescue JWT::DecodeError => e
          raise "Unauthorized: JWT::DecodeError Failed Vercel OIDC Authentication - #{e.message}"
        end

        private

        def jwks
          return @jwks_cache if @jwks_cache

          uri = URI.parse(ENV["JWKS_URL"])
          response = Net::HTTP.get_response(uri)
          raise "Failed to fetch JWKS: #{response.message}" unless response.is_a?(Net::HTTPSuccess)

          @jwks_cache = JSON.parse(response.body)
        end
      end
    end
  end
end
