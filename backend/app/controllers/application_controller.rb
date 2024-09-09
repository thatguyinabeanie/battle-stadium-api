require "pundit"
require "clerk/authenticatable"
require "clerk"
require_relative "../../lib/clerk_jwt"

class ApplicationController < ActionController::Base
  attr_reader :current_user
  include Clerk::Authenticatable
  include Pundit::Authorization

  after_action :verify_authorized
  before_action :authenticate_clerk_user!
  skip_before_action :authenticate_clerk_user!, only: %i[index show]

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

  def authenticate_clerk_user!
    @current_user = ClerkJwt::Session.authenticate!(request:)
  rescue StandardError => e
    render json: { error: e.message }, status: :unauthorized
  end

  def pundit_user
    current_user
  end
end
