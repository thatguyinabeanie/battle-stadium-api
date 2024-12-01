require_relative "../../../serializers/organization_serializer"
require_relative "../../../serializers/account_serializer"
require_relative "../../../serializers/tournament_serializer"

module Api
  module V1
    class OrganizationsController < AbstractApplicationController
      self.klass = ::Organization
      self.serializer_klass = Serializers::Organization
      self.detail_serializer_klass = Serializers::Organization

      before_action :set_organization, only: %i[staff post_tournament list_tournaments]

      skip_before_action :authenticate_clerk_user_session!, only: %i[staff list_tournaments]

      def self.policy_class
        ::OrganizationPolicy
      end

      def index
        authorize ::Organization, :index?

        @objects = if params[:query].present?
                query = "%#{params[:query]}%"
                ::Organization.where("name ILIKE ? OR slug ILIKE ?", query, query)
              else
                ::Organization.all
              end

        @objects = @objects.order(name: :asc)
        @objects = @objects.page(1).per(10000)

        render json: {
          data: @objects&.map { |object| index_serializer.new(object).attributes },
          meta: {
            current_page: @objects.current_page,
            next_page: @objects.next_page,
            prev_page: @objects.prev_page,
            total_pages: @objects.total_pages,
            total_count: @objects.total_count
          }
        }, status: :ok
      end

      def staff
        authorize ::Organization, :list?
        # Assuming there's an association called `staff_members` you can directly use it
        # If not, replace `organization.staff_members` with your logic to fetch staff members
        render json: @organization.staff, each_serializer: Serializers::Account, status: :ok
      rescue ActiveRecord::RecordNotFound
        render json: { error: "Organization not found" }, status: :not_found
      end

      def list_tournaments
        authorize ::Tournament, :list?
        @tournaments = @organization.tournaments
        render json: @tournaments, each_serializer: Serializers::Tournament, status: :ok
      end

      def post_tournament
        authorize @organization, :create_tournament?

        @tournament = @organization.tournaments.new tournaments_permitted_params

        if @tournament.save
          render json: @tournament, status: :created, serializer: Serializers::TournamentDetails
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
        params.require(:organization).permit(:name, :description, :owner_id, :format, :logo_url, :partner, :hidden)
      end

      def tournaments_permitted_params
        params.require(:tournament).permit(
          :tournament_id,
          :format,
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
