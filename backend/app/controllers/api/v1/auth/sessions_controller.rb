# frozen_string_literal: true

module Api
  module V1
    module Auth
      class SessionsController < Devise::SessionsController
        respond_to :json

        before_action :configure_sign_in_params, only: [:create]
        # skip_before_action :verify_authenticity_token, only: [:create]


        # Get Session and User
         def show
          session_token = params[:session_token]

          # Find the session by token
          session = Auth::Session.find_by(token: session_token)

          if session && session.active?
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
                created_at: user.created_at,
              }
            }
          else
            render json: { error: 'Invalid or expired session' }, status: :unauthorized
          end
        end


        # POST /api/v1/auth/sign_in
        def create
          email = params[:email]
          username = params[:username]
          password = params[:password]

          user = User.find_for_database_authentication(email:)
          user ||= User.find_for_database_authentication(username:)

          render json: { error: 'Invalid login' }, status: :unauthorizedActiveRecord::RecordNotFound unless user

          if user&.valid_password?(password)
            Rails.logger.info "#{user.email} password is valid. Creating Session..."
            session = ::Auth::Session.create(user: user)
            Rails.logger.info("session is created, token: #{session.token}")

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

        private

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
        # before_action :configure_sign_in_params, only: [:create]

        # GET /resource/sign_in
        # def new
        #   super
        # end

        # POST /resource/sign_in
        # def create
        #   super
        # end

        # DELETE /resource/sign_out
        # def destroy
        #   super
        # end

        # protected

        # If you have extra params to permit, append them to the sanitizer.
        # def configure_sign_in_params
        #   devise_parameter_sanitizer.permit(:sign_in, keys: [:attribute])
        # end
      end
    end
  end
end
