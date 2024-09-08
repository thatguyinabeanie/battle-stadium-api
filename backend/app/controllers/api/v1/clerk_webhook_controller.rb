require "openssl"
require "base64"

module Api
  module V1
    class ClerkWebhookController < ApiController
      skip_before_action :verify_clerk_session
      before_action :verify_clerk_webhook

      def verify_clerk_webhook
          authorize request, :valid_request?, policy_class: ClerkWebhookPolicy
      end

      def post
        handle_event(payload: params.to_unsafe_hash)
      rescue StandardError => e
        Rails.logger.error("Error handling webhook event: #{e.message}")
        render status: :unauthorized, json: { error: e.message }
      end

      private

      def handle_event(payload:)
        type = payload["type"]
        case type
        when "user.created"
          return handle_user_created(payload:)
        else
          Rails.logger.warn("Unhandled event type: #{type}")
          return render status: :bad_request, json: { error: "Unhandled event type" }
        end
      end

      def handle_user_created(payload:)
        data = payload["data"]

        email =  (data["email_addresses"].find { |email| email["id"] == data["primary_email_address_id"] })[:email_address]
        username = data["username"]
        first_name = data["first_name"]
        last_name = data["last_name"]
        image_url = data["image_url"]
        User.find_or_create_by!(email:, username:, first_name:, last_name:) do |u|
          u.image_url = image_url
        end
        render status: :created, json: { message: "User created successfully" }
      rescue StandardError => e
        render status: :internal_server_error, json: { error: e.message }
      end
    end
  end
end
