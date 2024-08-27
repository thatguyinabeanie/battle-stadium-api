require_relative '../../../serializer/user_serializer'
require 'jwt'
require_relative '../../../../lib/helpers/JWT/token_handler'

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
          decoded_token = Helpers::JWT::TokenHandler.new.decode!(token)
          decoded_token.first['sub']
          Rails.logger.info("Decoded token: #{decoded_token}")

          @current_user = User.find(decoded_token.first['sub'])

          Rails.logger.info("current_user: #{@current_user}")
        rescue JWT::DecodeError => e
          Rails.logger.error("JWT::DecodeError: #{e}")
          render json: { error: e.message }, status: :bad_request
        rescue ActiveRecord::RecordNotFound
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
