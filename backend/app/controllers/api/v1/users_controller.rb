require_relative "../../../serializers/user_serializer"

module Api
  module V1
    class UsersController < AbstractApplicationController
      self.klass = ::User
      self.serializer_klass = Serializers::User
      self.detail_serializer_klass = Serializers::UserDetails

      def self.policy_class
        ::UserPolicy
      end

      def me
        Rails.logger.info "api/v1/users_controller.rb: me"
        authorize @current_user, :me?
        render json: @current_user, serializer: Serializers::UserMe, status: :ok
      rescue ActiveRecord::RecordNotFound
        render json: { errors: ["User not found"] }, status: :not_found
      end

      protected

      # Only allow a list of trusted parameters through.
      def permitted_params
        params.require(:user).permit(:id, :username, :email, :pronouns, :first_name, :last_name)
      end

      private

      def find_user_by_email_or_username(email, username)
        User.find_for_database_authentication(email:) || User.find_for_database_authentication(username:)
      end

      # Use callbacks to share common setup or constraints between actions.
      def set_user
        @current_user = set_object
      end
    end
  end
end
