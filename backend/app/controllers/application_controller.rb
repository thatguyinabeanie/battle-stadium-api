require "pundit"
require_relative "../../lib/vercel_oidc.rb"

class ApplicationController < ActionController::Base
  attr_reader :current_user

  protect_from_forgery with: :exception
  include Devise::Controllers::Helpers
  include Pundit::Authorization

  after_action :verify_authorized
  before_action :authenticate_user

  before_action :verify_vercel_oidc_token, if: -> { Rails.env.production? }

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

  def verify_vercel_oidc_token
    decoded_token = VercelOidc.decode_token(request:)
    unless decoded_token
      raise StandardError, "Invalid token"
    end
  end


  def pundit_user
    current_user
  end
end
