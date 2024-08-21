module Api
  module V1
    class RegistrationsController < Devise::RegistrationsController
      respond_to :json

      private

      def respond_with(resource, _opts = {})
        resource.persisted? ? register_success : register_failed
      end

      def register_success
        render json: {
          message: 'Signed up successfully.',
          user: current_user
        }, status: :ok
      end

      def register_failed
        render json: {
          message: "Signing up failed: #{resource.errors.full_messages.to_sentence}"
        }, status: :unprocessable_entity
      end
    end
  end
end
