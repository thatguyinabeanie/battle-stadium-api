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
    if session_token
      clerk = Clerk::SDK.new
      session = clerk.verify_token(session_token)
      @current_user = User.find_by(clerk_user_id: session["userId"])
      @current_user
    else
      render json: { error: "invalid token or expired sessino" }, status: :unauthorized
    end
  rescue ::Auth::Session::InvalidTokenOrExpiredSession
    render json: { error: "invalid token or expired session" }, status: :unauthorized
  end

  def pundit_user
    current_user
  end
end
