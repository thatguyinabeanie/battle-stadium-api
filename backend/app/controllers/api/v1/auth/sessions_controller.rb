# frozen_string_literal: true

# app/controllers/api/v1/auth/sessions_controller.rb

require 'jwt'
require_relative '../../../../../lib/json_web_token'
require_relative '../../../../../lib/jwt_authenticate'

module Api
  module V1
    module Auth
      class SessionsController < ApplicationController
        respond_to :json
        skip_before_action :verify_authenticity_token, only: %i[create update show destroy]

        # GET /api/v1/auth/session
        def show
          authorize ::Auth::Session, :admin?
          session = ::JwtAuthenticate.session_from_authorization_header(request:)
          render_session_and_user(session, session.user)
        rescue ::Auth::Session::InvalidTokenOrExpiredSession => e
          Rails.logger.error("InvalidTokenOrExpiredSession: #{e.message}")
          render json: { error: 'Invalid token or expired session' }, status: :unauthorized
        end

        # POST /api/v1/auth/session
        def create
          authorize ::Auth::Session, :admin?
          user = User.find(params[:user_id])
          if user&.valid_password?(params[:password])
            session = ::Auth::Session.create(user:)

            render_session(session, :created)
          else
            render json: { error: 'Invalid login' }, status: :unauthorized
          end
        end

        # PUT /api/v1/auth/session
        def update
          authorize ::Auth::Session, :admin?
          session = ::JwtAuthenticate.session_from_authorization_header(request:)

          session.refresh
          render_session(session, :ok)
        rescue ::Auth::Session::InvalidTokenOrExpiredSession
          render json: { error: 'Invalid token or expired session' }, status: :unauthorized
        end

        # DELETE /api/v1/auth/sign_out
        def destroy
          authorize ::Auth::Session, :admin?
          session = ::JwtAuthenticate.session_from_authorization_header(request:)

          session.revoke
          render json: { message: 'Logged out successfully' }, status: :ok
        rescue ::Auth::Session::InvalidTokenOrExpiredSession
          render json: { error: 'Invalid token or expired session' }, status: :unauthorized
        end

        private

        def find_user_by_email_or_username(email, username)
          User.find_for_database_authentication(email:) || User.find_for_database_authentication(username:)
        end

        def render_session(session, status)
          render json: {
            token: session.token,
            user_id: session.user_id,
            expires_at: session.expires_at
          }, status:
        end

        def render_session_and_user(session, user)
          user ||= User.find(session.user_id)
          render json: {
            session: {
              token: session.token,
              user_id: session.user_id,
              expires_at: session.expires_at
            },
            user: {
              id: session.user_id,
              email: user.email,
              email_verified_at: user.email_verified_at,
              first_name: user.first_name,
              last_name: user.last_name,
              username: user.username,
              pronouns: user.pronouns
            }
          }, status: :ok
        end

        def invalid_token_or_expired_session
          render json: { error: 'Invalid token or expired session' }, status: :unauthorized
        end
      end
    end
  end
end
