# frozen_string_literal: true

module Api
  module V1
    module Auth
      class SessionsController < Devise::SessionsController
        respond_to :json

        before_action :configure_sign_in_params, only: [:create]
        skip_before_action :verify_authenticity_token, only: [:create]

        # POST /api/v1/auth/sign_in
        def create
          email = params[:email]
          # username = params[:username]
          password = params[:password]
          user = User.find_for_database_authentication(email:)
          # user ||= User.find_for_database_authentication(username:)
          if user&.valid_password?(password)
            sign_in(user)
            render json: {
              id: user.id,
              message: 'Logged in successfully.',
              username: user.username,
              email: user.email,
              pronouns: user.pronouns,
              first_name: user.first_name,
              last_name: user.last_name,
              token: current_token
            }, status: :created

          else
            render json: { error: 'Invalid email or password.' }, status: :unauthorized
          end
        end

        private

        def respond_with(resource, _opts = {})
          render json: { message: 'Logged in successfully.', user: resource }, status: :ok
        end

        def respond_to_on_destroy
          head :no_content
        end

        def current_token
          request.env['warden-jwt_auth.token']
        end

        # If you have extra params to permit, append them to the sanitizer.
        def configure_sign_in_params
          devise_parameter_sanitizer.permit(:sign_in, keys: %i[email password])
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
