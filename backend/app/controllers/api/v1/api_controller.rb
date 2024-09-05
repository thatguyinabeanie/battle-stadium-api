module Api
  module V1
    class ApiController < ApplicationController
      # include Pundit::Authorization
      # after_action :verify_authorized
      before_action :authenticate_user!

      def authenticate_user
        @user = ::JwtAuthenticate.session_from_authorization_header(request:).user
        Rails.logger.info   "Authenticated user: #{@user.inspect}"
        @user
      rescue ::Auth::Session::InvalidTokenOrExpiredSession => e
        Rails.logger.error("InvalidTokenOrExpiredSession: #{e.message}")
        render json: { error: 'Invalid token or expired session' }, status: :unauthorized
      end

      def current_user
        @user
      end

      def pundit_user
        @user
      end
    end
  end
end
