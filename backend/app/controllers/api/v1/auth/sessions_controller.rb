# frozen_string_literal: true

require 'jwt'
require_relative '../../../../../lib/helpers/JWT/token_handler'

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
          encrypted_token = request.headers['Authorization']&.split&.last
          decrypted_payload = TokenDecryptor.decrypt(encrypted_token)

          token = JSON.parse(decrypted_payload)['token']
          session = ::Auth::Session.find_by(token:)

          return invalid_token_or_expired_session unless session&.active?

          user = session.user

          render json: {
            session: {
              token: session.token,
              user_id: user.id,
              expires_at: session.expires_at
            },
            user: {
              id: user.id,
              email: user.email,
              email_verified: user.email_verified_at,
              first_name: user.first_name,
              last_name: user.last_name,
              username: user.username,
              pronouns: user.pronouns,
              created_at: user.created_at
            }
          }, status: :ok
        rescue StandardError
          render json: { error: 'Invalid token or expired session' }, status: :unauthorized
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
          encrypted_token = request.headers['Authorization']&.split&.last
          decrypted_payload = TokenDecryptor.decrypt(encrypted_token)
          token = JSON.parse(decrypted_payload)['token']

          session = ::Auth::Session.find_by(token:)

          return invalid_token_or_expired_session unless session&.active?

          session.refresh
          user = session.user

          render json: { session: {
            token: session.token,
            user_id: user.id,
            expires_at: session.expires_at
          }, user: {
            id: user.id,
            email: user.email,
            email_verified: user.email_verified_at,
            first_name: user.first_name,
            last_name: user.last_name,
            username: user.username,
            pronouns: user.pronouns,
            created_at: user.created_at
          } }, status: :ok
        rescue StandardError
          invalid_token_or_expired_session
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
