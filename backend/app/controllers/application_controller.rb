require "pundit"
require "clerk/authenticatable"
require "clerk"
require_relative "../../lib/clerk_jwt"

class ApplicationController < ActionController::Base
  include Clerk::Authenticatable
  attr_reader :current_user
  include Pundit::Authorization

  skip_before_action :verify_authenticity_token
  after_action :verify_authorized

  before_action :authenticate_clerk_user!

  skip_before_action :verify_clerk_session, only: %i[index show]
  before_action :set_no_cache_headers

  def index
    authorize self.class, :index?
  end

  def show
    authorize @object, :show?
  end

  protected

  def authenticate_clerk_user!
    ClerkJWT::Session.authenticate!(request:)
  rescue ClerkJWT::Session::NoAuthorizationHeader, ClerkJWT::Session::VerificationError, ClerkJWT::Session::InvalidSessionToken => e
    render json: { error: e.message }, status: :unauthorized
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
