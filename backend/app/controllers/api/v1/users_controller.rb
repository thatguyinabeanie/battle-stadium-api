require_relative '../../../serializer/user_serializer'
require 'jwt'
require_relative '../../../../lib/token_decryptor'

module Api
  module V1
    class UsersController < AbstractApplicationController
      self.klass = User
      self.serializer_klass = Serializer::User
      self.detail_serializer_klass = Serializer::UserDetails
      self.update_params_except = %i[password password_confirmation]

      before_action :set_user, only: %i[patch_password]
      before_action :authenticate_user, only: %i[me]
      before_action :set_cache_headers, only: %i[me]

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
        @user = current_user
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

      def authenticate_user
        token = request.headers['Authorization']&.split&.last

        begin
          decoded_token = JSON.parse(TokenDecryptor.decrypt(token)[:session][:sessionToken])
          sub = decoded_token['sub']
          jti = decoded_token['jti']
          token = decoded_token['token']
          session = ::Auth::Session.find_by!(user_id: sub, jti:, token:)
          @current_user = session.user if session.active?
        rescue StandardError
          render json: { error: 'User not found' }, status: :not_found
        end
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
