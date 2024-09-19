require "net/http"
require "uri"
require "json"
require "jwt"

module Auth
  module Clerk
    module TokenVerifier
      CLERK_API_URL = "https://api.clerk.dev/v1"

      class NoAuthorizationHeader < StandardError; end
      class VerificationError < StandardError; end
      class InvalidSessionToken < StandardError; end

      class << self
        @@clerk_api_key = ENV.fetch("CLERK_SECRET_KEY")

        def verify(request:)
          session_token = request.headers["Authorization"]&.split(",")&.last.split("Bearer ")&.last

          raise NoAuthorizationHeader, "Authorization header missing or malformed"  unless session_token

          verify_token(session_token:)
        end

        def verify_token(session_token:)

          # Fetch the JWT verification key from Clerk
          jwks = fetch_jwks

          # Decode the session token
          decoded_token = JWT.decode(session_token, nil, true, { algorithms: ["RS256"], jwks: })

          # Extract claims from the decoded token
          claims = decoded_token.first

          # Verify token claims (customize as needed)
          verify_claims(claims)

          # If all verifications pass, return the claims
          claims
        rescue JWT::DecodeError => e
          raise InvalidSessionToken, "Invalid token: #{e.message}"
        end

      private

        @@jwks = nil

        def fetch_jwks
          @@jwks ||= begin
            uri = URI("#{CLERK_API_URL}/jwks")
            request = Net::HTTP::Get.new(uri)
            request["Authorization"] = "Bearer #{@@clerk_api_key}"

            response = Net::HTTP.start(uri.hostname, uri.port, use_ssl: true) do |http|
              http.request(request)
            end

            raise "Failed to fetch JWKS: #{response.code} #{response.message}" unless response.is_a?(Net::HTTPSuccess)

            JSON.parse(response.body)
          end
          @@jwks
        end

        def verify_claims(claims)
          errors = []
          # Verify expiration time
          errors << "Token has expired" if Time.now.to_i > claims["exp"]

          # Verify issuer (customize with your Clerk frontend API)
          clerk_frontend_api_string = Rails.env.production? ? "CLERK_FRONTEND_API" : "CLERK_FRONTEND_API_DEV"
          errors << "Invalid issuer: #{claims["iss"]}" unless claims["iss"].start_with?(ENV.fetch(clerk_frontend_api_string))

          raise VerificationError, errors.join(", ") unless errors.empty?
        end
      end
    end
  end
end
