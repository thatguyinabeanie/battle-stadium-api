require_relative "../../../serializers/tournament_serializer"

module Api
  module V1
    class TournamentsController < ApiController
      before_action :set_tournaments, only: %i[show]
      before_action :set_tournament, only: %i[show update destroy start_tournament]
      before_action :set_organization, only: %i[create update]
      before_action :authenticate_clerk_user_session!

      def self.policy_class
        ::TournamentPolicy
      end

      def index
        authorize self.class, :index?
        @tournaments = ::Tournament.where(published: true).order(start_at: :desc).page(params[:page] || 0).per(params[:per_page] || 20)
        render json: {
          data: ActiveModelSerializers::SerializableResource.new(@tournaments, each_serializer: Serializers::Tournament),
          meta: {
            current_page: @tournaments.current_page,
            next_page: @tournaments.next_page,
            prev_page: @tournaments.prev_page,
            total_pages: @tournaments.total_pages,
            total_count: @tournaments.total_count
          }
        }, status: :ok
      end

      def show
        @object = @tournament
        super
        authorize @tournament, :show?
        render json: serialize_details, status: :ok
      rescue Pundit::NotAuthorizedError => e
        render json: { error: e.message }, status: :unauthorized
      end

      def create
        authorize @organization, :create_tournament?

        @tournament = ::Tournament.new permitted_params
        if @tournament.save

          render json: serialize_details, status: :created
        else

          render json: @tournament.errors, status: :unprocessable_entity
        end
      rescue ActionController::ParameterMissing => e
        render json: { error: e.message }, status: :bad_request
      end

      def update
        authorize @tournament, :update?
        if @tournament.update permitted_params
          render json: serialize_details, status: :ok
        else
          render json: @tournament.errors, status: :unprocessable_entity
        end
      end

      def destroy
        authorize @tournament, :destroy?
        @tournament.destroy!
        render json: { message: "Tournament deleted" }, status: :ok
      end

      def start_tournament
        authorize @tournament, :start_tournament?

        @tournament.start!
        render json: serialize_details, status: :ok
      rescue StandardError => e
        render json: { error: e.message }, status: :unprocessable_entity
      end

      private

      # Use callbacks to share common setup or constraints between actions.
      def set_tournament
        @tournament = ::Tournament.find(params[:id])
        @object = @tournament
        @tournament
      rescue ActiveRecord::RecordNotFound
        render json: { error: "Tournament not found" }, status: :not_found
      end

      def set_tournaments
        @tournaments =  if params[:organization_id].present?
                          @organization ||= set_organization
                          @organization.tournaments
                        else
                          @tournaments = ::Tournament.where("start_at > ?", Time.zone.now)
                                                                  .or(::Tournament.where(start_at: ..Time.zone.now)
                                                                  .where(ended_at: nil))
                        end
      end

      def set_organization
        @organization = if permitted_params[:organization_id].present?

                          ::Organization.find(permitted_params[:organization_id])
                        else
                          ::Tournament.find(params[:id]).organization
                        end

        @organization
      rescue ActiveRecord::RecordNotFound
        render json: { error: "Organization not found" }, status: :not_found
      end

      def serialize_details
        Serializers::TournamentDetails.new(@tournament).serializable_hash
      end

      # Only allow a list of trusted parameters through.
      def permitted_params
        params.require(:tournament).permit(
          :name,
          :start_at, :end_at,
          :game_id, :format_id,
          :autostart, :player_cap,
          :registration_start_at, :registration_end_at, :late_registration,
          :check_in_start_at, :check_in_end_at,
          :open_team_sheets, :teamlists_required,
          :organization_id,
          :page, :per_page
        )
      end
    end
  end
end
