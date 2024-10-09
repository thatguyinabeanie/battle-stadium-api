require_relative "../../../serializers/user_profile_serializer"

module Api
  module V1
    class UserProfilesController < ApplicationController
      def index
        authorize self.class, :index?
        @user_profiles = UserProfile.all
        render json: @user_profiles, each_serializer: Serializers::UserProfile, status: :ok
      rescue Pundit::NotAuthorizedError => e
        render json: { error: e.message }, status: :unauthorized
      end

      def show
        authorize self.class, :show?
        @user_profile = UserProfile.friendly.find(params[:slug])
        render json: @user_profile, serializer: Serializers::UserProfile, status: :ok
      rescue ActiveRecord::RecordNotFound => e
        render json: { error: e.message }, status: :not_found
      rescue Pundit::NotAuthorizedError => e
        render json: { error: e.message }, status: :unauthorized
      end

      private

      def permitted_params
        params.require(:user_profile).permit(:id, :username, :image_url)
      end
    end
  end
end
