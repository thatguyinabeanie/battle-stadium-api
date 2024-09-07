require "openssl"
require "base64"

module Api
  module V1
    class ClerkController < ApiController
      skip_before_action :verify_authenticity_token
      skip_before_action :authenticate_user

      def self.policy_class
        ::ClerkPolicy
      end

      def post
        skip_authorization
        policy = ClerkPolicy.new(request)

        if policy.webhook_verify?
          Rails.logger.info("Signature verified")
          render status: :ok, json: { message: "ok" }
        else
          Rails.logger.error("Signature verification failed")
          render status: :unauthorized, json: { error: "Signature verification failed" }
        end
      rescue StandardError => e
        Rails.logger.error("Webhook verification failed: #{e.message}")
        render status: :unauthorized, json: { error: e.message }
      end
    end
  end
end
