require_relative "../../../serializers/profile_serializer"

module Api
  module V1
    class ProfilesController < AbstractApplicationController
      self.klass = ::Profile
      self.serializer_klass = Serializers::Profile

      def self.policy_class
        ::AccountPolicy
      end

      def index
        authorize self.class, :index?
        @profiles = Profile.all
        render json: @profiles, each_serializer: Serializers::Profile, status: :ok
      end

      def show
        @profile = Profile.friendly.find(params[:slug])
        authorize @profile, :show?
        render json: @profile, serializer: Serializers::Profile, status: :ok
      rescue ActiveRecord::RecordNotFound => e
        skip_authorization
        render json: { error: e.message }, status: :not_found
      end

      def create
        authorize current_account, :create_profile?
        Rails.logger.info "Received params: #{params.inspect}"

        username = params[:user_name]
        image_url = params[:image_url]

        @profile  = Profile.new(username:, image_url:, account: current_account)

        if @profile.save
          render json: @profile, serializer: Serializers::Profile, status: :created
        else
          render json: { error: @profile.errors.full_messages }, status: :unprocessable_entity
        end
      end

      private

      def permitted_params
        params.require(:profile).permit(:id, :username, :image_url)
      end
    end
  end
end
