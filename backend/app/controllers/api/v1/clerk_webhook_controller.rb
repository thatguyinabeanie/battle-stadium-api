require "openssl"
require "base64"

module Api
  module V1
    class ClerkWebhookController < ApiController
      skip_before_action :verify_authenticity_token
      skip_before_action :authenticate_clerk_user_session!
      skip_before_action :validate_vercel_oidc_token! unless Rails.env.development?

      before_action :verify_clerk_webhook
      skip_after_action :verify_authorized if Rails.env.test?

      def post
        handle_event(payload: params.to_unsafe_hash)
      rescue StandardError => e
        render status: :unauthorized, json: { error: e.message }
      end

      private

      def verify_clerk_webhook
        authorize request, :valid_request?, policy_class: ClerkWebhookPolicy
      end

      def handle_event(payload:)
        type = payload["type"]
        case type
        when "user.created"
          return handle_user_created(payload:)
        when "user.updated"
          return render status: :bad_request, json: { message: "event type 'user.updated' is not yet implemented" }
        else
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
        Account.find_or_create_by!(email:, username:, first_name:, last_name:) do |account|
          account.image_url = image_url
        end
        render status: :created, json: { message: "Account created successfully" }
      rescue StandardError => e
        render status: :internal_server_error, json: { error: e.message }
      end
    end
  end
end
