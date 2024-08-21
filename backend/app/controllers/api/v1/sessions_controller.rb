require_relative '../../../serializer/user_serializer'

module Api
  module V1
    class SessionsController < Devise::SessionsController
      before_action :authenticate_user!, only: [:destroy]
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
        sign_out current_user
        head :no_content
      end

      private

      def respond_with(resource, _opts = {})
        render json: {
          status: { code: 200, message: 'Logged in sucessfully.' },
          data: ::Serializer::UserSerializer.new(resource).serializable_hash[:data][:attributes]
        }
      end

      def respond_to_on_destroy
        if current_user
          render json: {
            status: 200,
            message: 'logged out successfully'
          }, status: :ok
        else
          render json: {
            status: 401,
            message: "Couldn't find an active session."
          }, status: :unauthorized
        end
      end

      def resource_class
        User
      end
    end
  end
end
