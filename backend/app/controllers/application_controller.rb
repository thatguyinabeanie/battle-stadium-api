require "pundit"
require_relative "../../lib/clerk_jwt/session"

class ApplicationController < ActionController::Base
  attr_reader :current_user
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
    @current_user
  rescue StandardError => e
    Rails.logger.info "Failed to authenticate user: #{e.message}"
    render json: { error: e.message }, status: :unauthorized
  end

  def pundit_user
    current_user
  end
end
