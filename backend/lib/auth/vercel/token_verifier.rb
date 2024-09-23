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
        PRODUCTION_HOSTS = ["battlestadium.gg", "www.battlestadium.gg"].freeze

        @jwks_cache = nil

        def verify(request:)
          token = request.headers["X-Vercel-OIDC-Token"]
          raise NoAuthorizationHeader, "Authorization header missing or malformed" unless token
          verify_token(token:, request:)
        end

        def subject_environment(request:)
          return "development" unless Rails.env.production?
          return "production" if PRODUCTION_HOSTS.include?(request.host)
          "preview"
        end

        def verify_token(token:, request:)
          jwks = fetch_jwks
          jwk_loader = ->(options) { jwks["keys"] }
          subject = "#{ENV['SUBJECT']}:#{subject_environment(request:)}"
          JWT.decode(token, nil, true, {
            algorithms: ["RS256"],
            jwks: jwk_loader,
            iss: ENV["ISSUER"],
            verify_iss: true,
            aud: ENV["AUDIENCE"],
            verify_aud: true,
            sub: subject,
            verify_sub: true,
          })
        rescue JWT::DecodeError => e
          raise "Unauthorized: Failed Vercel OIDC Authentication - #{e.message}"
        end

        private

        def fetch_jwks
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
