require_relative "../../../serializers/profile_serializer"

module Api
  module V1
    class PlayerProfilesController < ApplicationController

      def index
        authorize self.class, :index?
        profiles = Profile.all
        render json: profiles, each_serializer: Serializers::Profile, status: :ok
      rescue Pundit::NotAuthorizedError => e
        render json: { error: e.message }, status: :unauthorized
      end

      def show
        authorize self.class, :show?
        @profile = Profile.friendly.find(params[:slug])
        render json: @profile, serializer: Serializers::Profile, status: :ok
      rescue ActiveRecord::RecordNotFound => e
        render json: { error: e.message }, status: :not_found
      rescue Pundit::NotAuthorizedError => e
        render json: { error: e.message }, status: :unauthorized
      end

      private

      def permitted_params
        params.require(:profile).permit(:id, :username, :image_url)
      end
    end
  end
end
