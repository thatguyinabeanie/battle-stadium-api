# frozen_string_literal: true

# app/controllers/api/v1/auth/sessions_controller.rb

require 'jwt'
require_relative '../../../../../lib/token_decryptor'

module Api
  module V1
    module Auth
      class SessionsController < Devise::SessionsController
        respond_to :json
        before_action :configure_sign_in_params, only: %i[create update show destroy]
        skip_before_action :verify_authenticity_token, only: %i[create update show destroy]

        # Get Session and User

        # GET /api/v1/auth/session
        def show
          auth_header = request.headers['Authorization']
          Rails.logger.info "Auth header: #{auth_header}"

          token = auth_header.split(' ').last if auth_header
          Rails.logger.info "Extracted token: #{token}"

          return invalid_token_or_expired_session unless token

          # Remove any wrapping quotes if present
          token = token.gsub(/^["']|["']$/, '')

          decrypted_payload = TokenDecryptor.decrypt(token)
          Rails.logger.info "Decrypted payload: #{decrypted_payload}"

          token = JSON.parse(decrypted_payload)['token']
          Rails.logger.info "Extracted token: #{token}"

          session = ::Auth::Session.find_by(token:)
          Rails.logger.info "Found session: #{session.inspect}"

          return invalid_token_or_expired_session unless session&.active?

          user = session.user
          Rails.logger.info "Found user: #{user.inspect}"

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
        rescue StandardError => e
          Rails.logger.error "Error in SessionsController#show: #{e.message}"
          Rails.logger.error e.backtrace.join("\n")
          render json: { error: 'An error occurred while processing your request' }, status: :internal_server_error
        end

        # POST /api/v1/auth/sign_in
        def create
          email = params[:email]
          username = params[:username]
          password = params[:password]

          user = User.find_for_database_authentication(email:)
          user ||= User.find_for_database_authentication(username:)

          if user&.valid_password?(password)
            session = ::Auth::Session.create(user:)

            render json: {
              id: user.id,
              message: 'Logged in successfully.',
              username: user.username,
              email: user.email,
              pronouns: user.pronouns,
              first_name: user.first_name,
              last_name: user.last_name,
              token: session.token
            }, status: :created
          else
            render json: { error: 'Invalid login' }, status: :unauthorized
          end
        end

        def update
          auth_header = request.headers['Authorization']
          Rails.logger.info "Auth header: #{auth_header}"

          encrypted_token = auth_header.split(' ').last if auth_header
          Rails.logger.info "Extracted encrypted token: #{encrypted_token}"

          return invalid_token_or_expired_session unless encrypted_token

          # Remove any wrapping quotes if present
          encrypted_token = encrypted_token.gsub(/^["']|["']$/, '')

          decrypted_payload = TokenDecryptor.decrypt(encrypted_token)
          Rails.logger.info "Decrypted payload: #{decrypted_payload}"

          token = JSON.parse(decrypted_payload)['token']
          Rails.logger.info "Extracted token: #{token}"

          session = ::Auth::Session.find_by(token:)
          Rails.logger.info "Found session: #{session.inspect}"

          return invalid_token_or_expired_session unless session&.active?

          session.touch(:updated_at) # Update the session's timestamp
          user = session.user
          Rails.logger.info "Updated session and found user: #{user.inspect}"

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
        rescue StandardError => e
          Rails.logger.error "Error in SessionsController#update: #{e.message}"
          Rails.logger.error e.backtrace.join("\n")
          render json: { error: "An error occurred while processing your request: #{e.message}" }, status: :internal_server_error
        end

        # DELETE /api/v1/auth/sign_out
        def destroy
          encrypted_token = request.headers['Authorization']&.split&.last
          decrypted_payload = TokenDecryptor.decrypt(encrypted_token)

          token = JSON.parse(decrypted_payload)['token']
          session = ::Auth::Session.find_by(token:)

          return invalid_token_or_expired_session unless session&.active?

          session.revoke_session

          render json: { message: 'Logged out successfully' }, status: :ok
        rescue StandardError
          render json: { error: 'Invalid token or expired session' }, status: :unauthorized
        end

        private

        def invalid_token_or_expired_session
          render json: { error: 'Invalid token or expired session' }, status: :unauthorized
        end

        def respond_with(resource, _opts = {})
          render json: { message: 'Logged in successfully.', user: resource }, status: :ok
        end

        def respond_to_on_destroy
          head :no_content
        end

        # If you have extra params to permit, append them to the sanitizer.
        def configure_sign_in_params
          devise_parameter_sanitizer.permit(:sign_in, keys: %i[email password username])
        end
      end
    end
  end
end
