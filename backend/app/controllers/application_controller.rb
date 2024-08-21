class ApplicationController < ActionController::API
  include DeviseTokenAuth::Concerns::SetUserByToken

  # before_action :configure_permitted_parameters, if: :devise_controller?

  # protected

  # DEVISE_USER_KEYS = %i[first_name last_name email username].freeze
  # def configure_permitted_parameters
  #   # For sign up
  #   devise_parameter_sanitizer.permit(:sign_up, keys: DEVISE_USER_KEYS)
  #   # For account update
  #   devise_parameter_sanitizer.permit(:account_update, keys: DEVISE_USER_KEYS)
  # end
end
