require "openssl"
require "base64"

module Api
  module V1
    class ClerkController < ApiController


      def self.policy_class
        ::ClerkPolicy
      end

      def post
        policy = ClerkPolicy.new(request)

        render status: :unauthorized, json: { error: "Signature verification failed" } unless policy.webhook_verify?
        handle_event(request)
      rescue StandardError => e
        render status: :unauthorized, json: { error: e.message }
      end


      private

      def handle_event(request)
        payload = JSON.parse(request.body.read)
        type = payload["type"]
        case type
        when "user.created"
          return handle_user_created(payload)
        when "user.updated"
          return handle_user_updated(payload)
        when "user.deleted"
          return handle_user_deleted(payload)
        when "session.created"
          return handle_session_created(payload)
        # Add more event types as needed
        else
          Rails.logger.warn("Unhandled event type: #{type}")
        end
      end

      def handle_user_created(payload)

        user_data = payload["data"]
        user_id = user_data["id"]
        username = user_data["username"]
        first_name = user_data["first_name"]
        last_name = user_data["last_name"]
        image_url = user_data["image_url"]
        # Implement your logic for handling user.created event
        # For example, you can create a new user record in the database

        primary_email_address_id = user_data["primary_email_address_id"]
        email_addresses = user_data["email_addresses"]
        email = email_addresses.find { |email| email["id"] == primary_email_address_id }["email_address"]

        User.find_or_create_by!(clerk_user_id: user_id, email:, username:) do |user|
          user.first_name = first_name
          user.last_name = last_name
          user.image_url = image_url
        end

        render status: :ok, json: { message: "User created successfully" }
      rescue StandardError => e
        render status: :internal_server_error, json: { error: e.message }
      end

      def handle_user_updated(payload)
        # Implement your logic for handling user.updated event
        Rails.logger.info("Handling user.updated event: #{payload}")
      end

      def handle_user_deleted(payload)
        # Implement your logic for handling user.deleted event
        Rails.logger.info("Handling user.deleted event: #{payload}")
      end

      def handle_session_created(payload)
        # Implement your logic for handling session.created event
        Rails.logger.info("Handling session.created event: #{payload}")

      end

    end
  end
end
