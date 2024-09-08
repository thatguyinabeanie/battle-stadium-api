require "openssl"
require "base64"

module Api
  module V1
    class ClerkController < ApiController
      skip_before_action :verify_authenticity_token

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
        payload = JSON.parse(request.body.read)
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
        Rails.logger.info("Handling user.created event: #{payload}")

        user_data = payload["data"]
        user_id = user_data["id"]
        username = user_data["username"]
        first_name = user_data["first_name"]
        last_name = user_data["last_name"]
        email_addresses = user_data["email_addresses"]
        image_url = user_data["image_url"]
        # Implement your logic for handling user.created event
        # For example, you can create a new user record in the database
        u = User.build(id: user_id, name: username, first_name:, last_name:, email: email_addresses.first, image: image_url)

        if u.save
          Rails.logger.info("User created successfully")
        else
          Rails.logger.error("Failed to create user: #{u.errors.full_messages}")
        end
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
