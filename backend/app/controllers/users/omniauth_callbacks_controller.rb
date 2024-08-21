# app/controllers/users/omniauth_callbacks_controller.rb
module Users
  class OmniauthCallbacksController < DeviseTokenAuth::OmniauthCallbacksController
    def omniauth_success
      # Custom logic for handling successful authentication
      super
    end

    def omniauth_failure
      # Custom logic for handling failed authentication
      super
    end
  end
end
