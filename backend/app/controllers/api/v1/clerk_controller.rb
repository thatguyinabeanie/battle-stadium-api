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

        render status: :unauthorized, json: { error: "Signature verification failed" } unless policy.webhook_verify?
        handle_event(request)
      rescue StandardError => e
        Rails.logger.error("Webhook verification failed: #{e.message}")
        render status: :unauthorized, json: { error: e.message }
      end


      private

      def handle_event(request)
        payload = JSON.parse(request.body.read);
        type = payload["type"]
        case type
        when "user.created"
          return handle_user_created(payload)
        when "user.updated"
          return handle_user_updated(payload)
        when "user.deleted"
          return handle_user_deleted(payload)
        # Add more event types as needed
        else
          Rails.logger.warn("Unhandled event type: #{type}")
        end
      end

      def handle_user_created(payload)
        # Implement your logic for handling user.created event

        Rails.logger.info("Handling user.created event: #{payload}")
      end

      def handle_user_updated(payload)
        # Implement your logic for handling user.updated event
        Rails.logger.info("Handling user.updated event: #{payload}")
      end

      def handle_user_deleted(payload)
        # Implement your logic for handling user.deleted event
        Rails.logger.info("Handling user.deleted event: #{payload}")
      end

    end
  end
end
