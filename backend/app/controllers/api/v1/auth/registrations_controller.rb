# frozen_string_literal: true

module Api
  module V1
    module Auth
      class RegistrationsController < Devise::RegistrationsController
        before_action :configure_permitted_parameters, if: :devise_controller?
        DEVISE_USER_KEYS = %i[first_name last_name email username password password_confirmation].freeze
        respond_to :json

        # POST /resource
        def create
          parms = params.require(:user).permit(:username, :password, :password_confirmation, :email, :first_name, :last_name)

          build_resource(parms)
          resource.save
          render_resource(resource)
        end

        # PUT /resource
        def update
          resource_updated = update_resource(resource, account_update_params)
          render_resource(resource_updated)
        end

        # DELETE /resource
        def destroy
          resource.destroy
          head :no_content
        end

        # # The path used after sign up.
        # def after_sign_up_path_for(resource)
        #   super
        # end

        # # The path used after sign up for inactive accounts.
        # def after_inactive_sign_up_path_for(resource)
        #   super
        # end
        #
        protected

        def configure_permitted_parameters
          devise_parameter_sanitizer.permit(:sign_up, keys: DEVISE_USER_KEYS)
          devise_parameter_sanitizer.permit(:account_update, keys: DEVISE_USER_KEYS)
        end

        private

        def render_resource(resource)
          if resource.errors.empty?
            render json: resource
          else
            render json: resource.errors, status: :unprocessable_entity
          end
        end
      end
    end
  end
end
