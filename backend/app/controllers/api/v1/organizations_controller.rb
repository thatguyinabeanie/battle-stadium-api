require_relative '../../../serializer/organization_serializer'
require_relative '../../../serializer/user_serializer'
require_relative '../../../serializer/tournament_serializer'

module Api
  module V1
    class OrganizationsController < AbstractApplicationController
      before_action :set_organization, only: %i[show update destroy staff post_tournaments] # rubocop:disable Rails/LexicallyScopedActionFilter

      self.klass = ::Organization
      self.serializer_klass = Serializer::Organization
      self.detail_serializer_klass =Serializer::Organization

      def staff
        # Assuming there's an association called `staff_members` you can directly use it
        # If not, replace `organization.staff_members` with your logic to fetch staff members
        render json: @organization.staff, each_serializer: Serializer::User, status: :ok
      rescue ActiveRecord::RecordNotFound
        render json: { error: 'Organization not found' }, status: :not_found
      end

      def post_tournaments
        @tournament = @organization.tournaments.new tournaments_permitted_params
        if @tournament.save
          render json: @tournament, status: :created, serializer: Serializer::Tournament
        else
          render json: @tournament.errors, status: :unprocessable_entity
        end
      rescue ActionController::ParameterMissing => e
        render json: { error: e.message }, status: :bad_request
      end

      private

      def set_organization
        @organization = set_object
      end

      def permitted_params
        params.require(:organization).permit(:name, :description, :owner_id)
      end

      def tournaments_permitted_params
        tour_params = params.require(:tournament).permit(
          :name,
          :start_at, :end_at,
          :game_id, :format_id,
          :autostart, :player_cap,
          :registration_start_at, :registration_end_at, :late_registration,
          :check_in_start_at,
          :open_team_sheets, :teamlists_required
        )
      end
    end
  end
end
