require "pundit"
require "clerk/authenticatable"
require "clerk"

class ApplicationController < ActionController::Base
  include Clerk::Authenticatable
  attr_reader :current_user
  include Pundit::Authorization

  skip_before_action :verify_authenticity_token
  after_action :verify_authorized

  before_action :verify_clerk_session

  skip_before_action :verify_clerk_session, only: %i[index show]
  before_action :set_no_cache_headers

  def index
    authorize self.class, :index?
  end

  def show
    authorize @object, :show?
  end

  protected

  def verify_clerk_session
    session_token = request.headers["Authorization"]&.split("Bearer ")&.last

    if session_token
      begin
        clerk = Clerk::SDK.new
        session = clerk.verify_token(session_token)

        if session && session["userId"]

          @current_user = User.find_or_create_by(email: session["email"], username: session["username"]) do |user|
            user.first_name = session["firstName"]
            user.last_name = session["lastName"]
            user.image_url = session["imageUrl"]
          end
          @current_user.clerk_users.find_or_create_by(clerk_user_id: session["userId"], user: @current_user)
          @current_user.save!
        else
          render json: { error: "Invalid session token" }, status: :unauthorized
        end
      rescue StandardError => e
        Rails.logger.error("Clerk verification error: #{e.message}")
        render json: { error: "Invalid token or expired session" }, status: :unauthorized
      end
    else
      render json: { error: "Authorization header missing or malformed" }, status: :unauthorized
    end
  end

  def pundit_user
    current_user
  end

  private

  def set_no_cache_headers
    response.headers["Cache-Control"] = "no-store, no-cache, must-revalidate, max-age=0"
    response.headers["Pragma"] = "no-cache"
    response.headers["Expires"] = "Fri, 01 Jan 1990 00:00:00 GMT"
  end
end
