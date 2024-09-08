require_relative "../../../serializers/organization_serializer"
require_relative "../../../serializers/user_serializer"
require_relative "../../../serializers/tournament_serializer"
require_relative "../../../../lib/vercel_oidc"

module Api
  module V1
    class OrganizationsController < AbstractApplicationController
      self.klass = ::Organization
      self.serializer_klass = Serializers::Organization
      self.detail_serializer_klass = Serializers::Organization

      before_action :set_organization, only: %i[staff post_tournaments patch_tournament list_tournaments]


      def self.policy_class
        ::OrganizationPolicy
      end

      def staff
        # authorize ::Organization, :staff?
        # Assuming there's an association called `staff_members` you can directly use it
        # If not, replace `organization.staff_members` with your logic to fetch staff members
        render json: @organization.staff, each_serializer: Serializers::User, status: :ok
      rescue ActiveRecord::RecordNotFound
        render json: { error: "Organization not found" }, status: :not_found
      end

      def list_tournaments
        # authorize ::Tournaments::Tournament, :list?
        @tournaments = @organization.tournaments
        render json: @tournaments, each_serializer: Serializers::Tournament, status: :ok
      end

      def post_tournaments
        # authorize @organization, :create_tournament?

        @tournament = @organization.tournaments.new tournaments_permitted_params

        if @tournament.save
          render json: @tournament, status: :created, serializer: Serializers::TournamentDetails
        else
          render json: @tournament.errors, status: :unprocessable_entity
        end
      rescue ActionController::ParameterMissing => e
        render json: { error: e.message }, status: :bad_request
      end

      def patch_tournament
        # authorize @organization, :update_tournament?
        @tournament = @organization.tournaments.find(params[:tournament_id])
        if @tournament.update! tournaments_permitted_params
          render json: @tournament, status: :ok, serializer: Serializers::TournamentDetails
        else
          render json: @tournament.errors, status: :unprocessable_entity
        end
      rescue ActiveRecord::RecordNotFound
        render json: { error: "Tournament not found" }, status: :not_found
      end

    private

      def set_organization
        @organization = set_object
      end

      def permitted_params
        params.require(:organization).permit(:name, :description, :owner_id)
      end

      def tournaments_permitted_params
        params.require(:tournament).permit(
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
