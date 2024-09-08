require "pundit"
require "clerk/authenticatable"
require "clerk"

class ApplicationController < ActionController::Base
  attr_reader :current_user
  include Pundit::Authorization

  after_action :verify_authorized
  before_action :authenticate_user
  skip_before_action :authenticate_user, only: %i[index show]

  def index
    authorize self.class, :index?
  end

  def show
    authorize @object, :show?
  end

  protected


  def authenticate_user

    # Use short-lived session tokens for authentication
    session_token = request.headers["Authorization"]&.split("Bearer ")&.last
    Rails.logger.error("Session token: #{session_token}")
    if session_token
      clerk = Clerk::SDK.new
      session = clerk.verify_token(session_token)
      Rails.logger.error("Session: #{session.inspect}")
      @current_user = User.find_by(clerk_user_id: session["userId"])
      @current_user
    else
      Rails.logger.error("No session token provided")
      render json: { error: I18n.t("session.errors.invalid_token_or_expired") }, status: :unauthorized
    end
  rescue ::Auth::Session::InvalidTokenOrExpiredSession => e
    Rails.logger.error("InvalidTokenOrExpiredSession: #{e.message}")
    render json: { error: I18n.t("session.errors.invalid_token_or_expired") }, status: :unauthorized
  end

  def pundit_user
    current_user
  end
end
