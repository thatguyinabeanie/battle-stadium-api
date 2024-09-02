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
          session, user = find_session_and_user_from_token
          return invalid_token_or_expired_session unless session&.active?

          render_session_and_user(session, user)
        rescue StandardError
          render json: { error: 'An error occurred while processing your request' }, status: :internal_server_error
        end

        # POST /api/v1/auth/sign_in
        def create
          user = find_user_by_email_or_username(params[:email], params[:username])
          if user&.valid_password?(params[:password])
            session = ::Auth::Session.create(user:)

            render json: {
              id: user.id,
              message: 'Logged in successfully.',
              username: user.username,
              email: user.email,
              pronouns: user.pronouns,
              first_name: user.first_name,
              last_name: user.last_name,
              name: user.name || "#{user.first_name} #{user.last_name}",
              token: session.jwt_payload.to_json
            }, status: :created
          else
            render json: { error: 'Invalid login' }, status: :unauthorized
          end
        end

        # PUT /api/v1/auth/session
        def update
          session, user = find_session_and_user_from_token
          return invalid_token_or_expired_session unless session&.active?

          session.refresh
          render_session_and_user(session, user)
        rescue StandardError => e
          render json: { error: "An error occurred while processing your request: #{e.message}" }, status: :internal_server_error
        end

        # DELETE /api/v1/auth/sign_out
        def destroy
          session, _user = find_session_and_user_from_token
          return invalid_token_or_expired_session unless session&.active?

          session.revoke_session
          render json: { message: 'Logged out successfully' }, status: :ok
        rescue StandardError
          render json: { error: 'An error occurred while processing your request' }, status: :internal_server_error
        end

        private

        def find_user_by_email_or_username(email, username)
          User.find_for_database_authentication(email:) || User.find_for_database_authentication(username:)
        end

        def find_session_and_user_from_token
          auth_header = request.headers['Authorization']
          token = auth_header.split.last.gsub(/^["']|["']$/, '')
          decrypted_payload = TokenDecryptor.decrypt(token)

          jwt_json = JSON.parse(decrypted_payload)['token']
          jwt = JSON.parse(jwt_json)

          session = ::Auth::Session.find_by(token: jwt['token'], jti: jwt['jti'], user_id: jwt['sub'])
          user = session&.user

          [session, user]
        end

        def render_session_and_user(session, user)
          render json: {
            session: {
              token: session.jwt_payload.to_json,
              user_id: user.id,
              expires_at: session.expires_at
            },
            user: {
              id: user.id,
              email: user.email,
              email_verified_at: user.email_verified_at,
              first_name: user.first_name,
              last_name: user.last_name,
              name: user.name || "#{user.first_name} #{user.last_name}",
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
