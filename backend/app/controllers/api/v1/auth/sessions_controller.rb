# frozen_string_literal: true

# app/controllers/api/v1/auth/sessions_controller.rb

require 'jwt'
require_relative '../../../../../lib/token_decryptor'

module Api
  module V1
    module Auth
      class SessionsController < ApplicationController
        respond_to :json
        skip_before_action :verify_authenticity_token, only: %i[create update show destroy]

        # GET /api/v1/auth/session
        def show
          session = find_session_from_authorization_header
          return invalid_token_or_expired_session unless session&.active?

          render_session_and_user(session, session.user)
        rescue ::Auth::Session::InvalidTokenOrExpiredSession=> e
          Rails.logger.error('InvalidTokenOrExpiredSession: ' +e.message)
          render json: { error: 'Invalid token or expired session' }, status: :unauthorized
        end

        # POST /api/v1/auth/session
        def create
          Rails.logger.info("params: #{params}")
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
          session = find_session_from_authorization_header
          return invalid_token_or_expired_session unless session&.active?

          session.refresh
          render_session(session, :ok)
        rescue ::Auth::Session::InvalidTokenOrExpiredSession
          render json: { error: 'Invalid token or expired session' }, status: :unauthorized
        end

        # DELETE /api/v1/auth/sign_out
        def destroy
          session = find_session_from_authorization_header
          return invalid_token_or_expired_session unless session&.active?

          session.revoke
          render json: { message: 'Logged out successfully' }, status: :ok
        rescue ::Auth::Session::InvalidTokenOrExpiredSession
          render json: { error: 'Invalid token or expired session' }, status: :unauthorized
        end

        private

        def find_user_by_email_or_username(email, username)
          User.find_for_database_authentication(email:) || User.find_for_database_authentication(username:)
        end

        def find_session_from_authorization_header
          auth_header = request.headers['Authorization']
          token = auth_header.split.last.gsub(/^["']|["']$/, '')
          decrypted_payload = TokenDecryptor.decrypt(token)

          if decrypted_payload.is_a?(String)
            jwt = JSON.parse(decrypted_payload)
            sub = jwt['sub']
            session = ::Auth::Session
              .where(user_id: sub)
              .where('expires_at > ?', Time.now.utc)
              .order(created_at: :desc)
              .first

            return session
          end

          session_token = decrypted_payload['session']['sessionToken'] || decrypted_payload['token']

          session = ::Auth::Session.find_by!(token: session_token, user_id: decrypted_payload['session']['user']['id'])
          user = session&.user
          [session, user]
        rescue StandardError => e
          raise ::Auth::Session::InvalidTokenOrExpiredSession, e.message
        end

        def render_session(session, status)
          render json: {
              token: session.token,
              user_id: session.user_id,
              expires_at: session.expires_at
          }, status:
        end

        def render_session_and_user(session, user)
          render json: {
            session: {
              token: session.token,
              user_id: user.id,
              expires_at: session.expires_at
            },
            user: {
              id: user.id,
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
