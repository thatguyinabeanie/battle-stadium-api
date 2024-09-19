require "pundit"
require_relative "../../lib/auth/clerk/session"
require_relative "../../lib/auth/vercel/token_verifier"

class ApplicationController < ActionController::Base
  attr_reader :current_user
  include Pundit::Authorization

  after_action :verify_authorized
  before_action :authenticate_clerk_user_session!
  before_action :validate_vercel_oidc_token!
  skip_before_action :authenticate_clerk_user_session!, only: %i[index show]

  def self.policy_class
    ::ApplicationPolicy
  end

  def index
    authorize self.class, :index?
  end

  def show
    authorize @object, :show?
  end

  protected

  def validate_vercel_oidc_token!
    ::Auth::Vercel::TokenVerifier.verify(request:)
  end

  def authenticate_clerk_user_session!
    @current_user = ::Auth::Clerk::Session.authenticate!(request:)
  rescue Auth::Clerk::TokenVerifier::InvalidSessionToken => e
    render json: { error: e.message }, status: :unauthorized
  end

  def pundit_user
    current_user
  end
end
