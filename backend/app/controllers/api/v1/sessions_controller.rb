module Api
  module V1
    class SessionsController < Devise::SessionsController
      respond_to :json

      def create
        user = User.find_by(email: params[:user][:email])
        password = params[:user][:password]

        if user&.valid_password?(password)
          sign_in user, store: false
          jwt = JsonWebToken.encode({ id: user.id })
          render json: { token: jwt }, status: :ok
        else
          Rails.logger.info 'Invalid email or password'
          render json: { error: 'Invalid email or password' }, status: :unauthorized
        end
      end

      def destroy
        head :no_content
      end

      private

      def respond_with(resource, _opts = {})
        render json: resource, status: :ok
      end

      def respond_to_on_destroy
        head :no_content
      end
    end
  end
end
