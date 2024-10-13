require_relative "../../../serializers/user_profile_serializer"

module Api
  module V1
    class UserProfilesController < AbstractApplicationController
      self.klass = ::UserProfile
      self.serializer_klass = Serializers::UserProfile

      def self.policy_class
        ::UserPolicy
      end

      def index
        authorize self.class, :index?
        @user_profiles = UserProfile.all
        render json: @user_profiles, each_serializer: Serializers::UserProfile, status: :ok
      rescue Pundit::NotAuthorizedError => e
        render json: { error: e.message }, status: :unauthorized
      end

      def show
        @user_profile = UserProfile.friendly.find(params[:slug])
        authorize @user_profile, :show?
        render json: @user_profile, serializer: Serializers::UserProfile, status: :ok
      rescue ActiveRecord::RecordNotFound => e
        skip_authorization
        render json: { error: e.message }, status: :not_found
      rescue Pundit::NotAuthorizedError => e
        render json: { error: e.message }, status: :unauthorized
      end

      def create
        authorize current_user, :create_profile?
        Rails.logger.info "Received params: #{params.inspect}"

        username = params[:user_name]
        image_url = params[:image_url]

        @user_profile  = UserProfile.new(username:, image_url:, user: current_user)

        if @user_profile.save
          render json: @user_profile, serializer: Serializers::UserProfile, status: :created
        else
          render json: { error: @user_profile.errors.full_messages }, status: :unprocessable_entity
        end
      end

      private

      def permitted_params
        params.require(:user_profile).permit(:id, :username, :image_url)
      end
    end
  end
end
