require_relative '../../../serializers/user_serializer'
require_relative '../../../../lib/json_web_token'

module Api
  module V1
    class UsersController < AbstractApplicationController
      self.klass = User
      self.serializer_klass = Serializers::User
      self.detail_serializer_klass = Serializers::UserDetails
      self.update_params_except = %i[password password_confirmation]

      before_action :set_user, only: %i[patch_password]
      before_action :authenticate_user, only: %i[me patch_password update destroy create]

      before_action :set_cache_headers, only: %i[me]

      # rubocop:disable Rails/LexicallyScopedActionFilter
      skip_before_action :verify_authenticity_token, only: %i[create update show destroy password_login me patch_password]
      # rubocop:enable Rails/LexicallyScopedActionFilter

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

      def password_login
        authorize ::User, :password_login?

        user = find_user_by_email_or_username(params[:email], params[:username])

        if user&.valid_password?(params[:password])
          render json: {
            id: user.id,
            username: user.username,
            email: user.email,
            pronouns: user.pronouns,
            first_name: user.first_name,
            last_name: user.last_name,
            email_verified_at: user.email_verified_at,
            token: ::Auth::Session.create(user:).token
          }, status: :ok
        else
          render json: { error: 'Invalid login' }, status: :unauthorized
        end
      end

      def me
        authorize @current_user, :me?
        render json: @current_user, serializer: Serializers::UserMe, status: :ok
      rescue ActiveRecord::RecordNotFound
        render json: { errors: ['User not found'] }, status: :not_found
      end

      protected

      # Only allow a list of trusted parameters through.
      def permitted_params
        params.require(:user).permit(:id, :username, :email, :pronouns, :first_name, :last_name, :password,
                                     :password_confirmation)
      end

      private

      def find_user_by_email_or_username(email, username)
        User.find_for_database_authentication(email:) || User.find_for_database_authentication(username:)
      end

      # Use callbacks to share common setup or constraints between actions.
      def set_user
        @user = set_object
      end

      def set_cache_headers
        response.headers['Cache-Control'] = 'public, max-age=300'
      end
    end
  end
end
