require "pundit"

class ApplicationController < ActionController::Base
  attr_reader :current_user

  protect_from_forgery with: :exception
  include Devise::Controllers::Helpers
  include Pundit::Authorization

  after_action :verify_authorized
  before_action :authenticate_user

  def index
    authorize self.class, :index?
  end

  def show
    authorize @object, :show?
  end

  protected

  def authenticate_user
    @session = ::JwtAuthenticate.session_from_authorization_header(request:)
    @current_user = @session.user
    @current_user
  rescue ::Auth::Session::InvalidTokenOrExpiredSession => e
    Rails.logger.error("InvalidTokenOrExpiredSession: #{e.message}")
    render json: { error: I18n.t("session.errors.invalid_token_or_expired") }, status: :unauthorized
  end

  def pundit_user
    current_user
  end
end
