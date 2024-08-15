require_relative '../../../serializer/user_serializer'

module Api
  module V1
    class UsersController < AbstractApplicationController
      self.klass = User
      self.serializer_klass = Serializer::User
      self.detail_serializer_klass = Serializer::UserDetails
      self.update_params_except = %i[password password_confirmation]

      before_action :set_user, only: %i[patch_password]

      # PATCH /api/v1/users/:id/password
      # PATCH /api/v1/users/:id/password.json
      def patch_password
        password_params = params.require(:user).permit(:password, :password_confirmation, :current_password)

        if password_params[:password].blank?
          render json: { errors: ["Password can't be blank"] }, status: :unprocessable_entity
        elsif @user.update_with_password(password_params)
          render json: { message: 'Password updated successfully' }, status: :ok
        else
          render json: { errors: @user.errors.full_messages }, status: :unprocessable_entity
        end
      end

      def me
        # @user = current_user
        @user = User.find(1)

        render json: @user, serializer: Serializer::UserMe, status: :ok
      rescue ActiveRecord::RecordNotFound
        render json: { errors: ['User not found'] }, status: :not_found
      end

      protected

      # Only allow a list of trusted parameters through.
      def permitted_params
        params.require(:user).permit(:id, :username, :email, :pronouns, :first_name, :last_name, :password, :password_confirmation)
      end

      private

      # Use callbacks to share common setup or constraints between actions.
      def set_user
        @user = set_object
      end
    end
  end
end
