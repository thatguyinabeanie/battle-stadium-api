require "net/http"
require "uri"
require "json"
require "jwt"

class ClerkTokenVerifier
  CLERK_API_URL = "https://api.clerk.dev/v1"

  def initialize(clerk_api_key = ENV.fetch("CLERK_SECRET_KEY", nil))
    @clerk_api_key = clerk_api_key
  end

  def verify_token(session_token)
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
    raise "Invalid token: #{e.message}"
  end

  private

  @@jwks = nil

  def fetch_jwks
    @@jwks ||= begin
      uri = URI("#{CLERK_API_URL}/jwks")
      request = Net::HTTP::Get.new(uri)
      request["Authorization"] = "Bearer #{@clerk_api_key}"

      response = Net::HTTP.start(uri.hostname, uri.port, use_ssl: true) do |http|
        http.request(request)
      end

      raise "Failed to fetch JWKS: #{response.code} #{response.message}" unless response.is_a?(Net::HTTPSuccess)

      JSON.parse(response.body)
    end
    @@jwks
  end

  def verify_claims(claims)
    # Verify expiration time
    raise "Token has expired" if Time.now.to_i > claims["exp"]

    # Verify issuer (customize with your Clerk frontend API)
    if Rails.env.development?
      raise "Invalid issuer" unless claims["iss"].start_with?("https://dashing-eel-80.clerk.accounts.dev")
    end
  end
end

# Usage example:
# verifier = ClerkTokenVerifier.new('your_clerk_api_key')
# begin
#   claims = verifier.verify_token('your_session_token')
#   puts "Token verified successfully. User ID: #{claims['sub']}"
# rescue StandardError => e
#   puts "Token verification failed: #{e.message}"
# end
