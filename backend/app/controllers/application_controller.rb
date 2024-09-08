require "pundit"
require "clerk/authenticatable"
require "clerk"

class ApplicationController < ActionController::Base
  attr_reader :current_user

  protect_from_forgery with: :exception
  # include Pundit::Authorization

  # after_action :verify_authorized
  # before_action :authenticate_user
  # skip_before_action :authenticate_user, only: %i[index show]

  # def index
  #   authorize self.class, :index?
  # end

  # def show
  #   authorize @object, :show?
  # end

  protected

  def authenticate_user_old
    @session = ::JwtAuthenticate.session_from_authorization_header(request:)
    @current_user = @session.user
    @current_user
  rescue ::Auth::Session::InvalidTokenOrExpiredSession => e
    Rails.logger.error("InvalidTokenOrExpiredSession: #{e.message}")
    render json: { error: "invalid token" }, status: :unauthorized
  end

  def authenticate_clerk_user

    # Use short-lived session tokens for authentication
    session_token = request.headers["Authorization"]&.split("Bearer ")&.last
    if session_token
      clerk = Clerk::SDK.new
      session = clerk.verify_token(session_token)

    else
      Rails.logger.error("No session token provided")
      render json: { error: I18n.t("session.errors.invalid_token_or_expired") }, status: :unauthorized
    end

  rescue ::Auth::Session::InvalidTokenOrExpiredSession => e
    Rails.logger.error("InvalidTokenOrExpiredSession: #{e.message}")
    render json: { error: I18n.t("session.errors.invalid_token_or_expired") }, status: :unauthorized
  end

  # def pundit_user
  #   current_user
  # end
end
