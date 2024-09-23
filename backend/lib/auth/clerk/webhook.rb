require "active_support/security_utils"
require_relative "token_verifier"
module Auth
  module Clerk
    module Webhook
      class Error < StandardError; end
      class << self
        WEBHOOK_TOLERANCE_IN_SECONDS = 300 # 5 minutes
        def validate!(request:)
          validate_request(request:)
        end

        private

        def validate_request(request:)
          payload = request.raw_post

          headers = {
            "svix-id" => request.headers["HTTP_SVIX_ID"],
            "svix-timestamp" => request.headers["HTTP_SVIX_TIMESTAMP"],
            "svix-signature" => request.headers["HTTP_SVIX_SIGNATURE"]
          }

          # Check for missing headers first
          raise Error, "Missing required headers" if headers.values.any?(&:nil?)

          return nil unless verify_timestamp(headers["svix-timestamp"]) && verify_signature(payload, headers)

          JSON.parse(payload)
        end

        def verify_timestamp(timestamp)
          raise Error, "Invalid timestamp" if timestamp.nil? || timestamp.to_i == 0
          webhook_timestamp = timestamp.to_i
          current_timestamp = Time.now.to_i

          if (current_timestamp - webhook_timestamp).abs > WEBHOOK_TOLERANCE_IN_SECONDS
            raise Error, "Webhook timestamp is outside of the tolerance zone"
          end

          true
        end

        def verify_signature(payload, headers)
          secret = ENV["CLERK_WEBHOOK_SECRET"]
          raise Error, "Missing CLERK_WEBHOOK_SECRET environment variable" if secret.nil?

          # Remove 'whsec_' prefix if present
          secret = secret.sub(/^whsec_/, "")

          svix_id = headers["svix-id"]
          svix_timestamp = headers["svix-timestamp"]
          svix_signature = headers["svix-signature"]

          # Construct the signed payload
          signed_payload = "#{svix_id}.#{svix_timestamp}.#{payload}"

          # Decode the secret
          secret_bytes = Base64.decode64(secret)

          # Calculate the signature
          signature = Base64.strict_encode64(
            OpenSSL::HMAC.digest("sha256", secret_bytes, signed_payload)
          )

          # Verify against all provided signatures
          signatures = svix_signature.split(" ")
          unless signatures.any? { |sig| verify_individual_signature(sig, signature) }
            raise Error, "No matching signature found"
          end

          true
        end

        def verify_individual_signature(provided_signature, calculated_signature)
          version, signature = provided_signature.split(",", 2)
          return false unless version == "v1"

          ActiveSupport::SecurityUtils.secure_compare(signature, calculated_signature)
        end
      end
    end
  end
end
