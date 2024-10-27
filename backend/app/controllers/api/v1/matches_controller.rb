require_relative "../../../serializers/match_serializer"

module Api
  module V1

    class MatchesController < ApplicationController
      before_action :set_tournament
      before_action :set_matches, only: %i[index]
      before_action :set_match, only: %i[show update check_in reset]

      def index
        authorize self.class, :index?

        render json: @tournament.matches, each_serializer: Serializers::Match, status: :ok
      end

      def show
        authorize @match, :show?
        render json: serialize_details, status: :ok
      end

      def update
        authorize @match, :update?
        if @match.update permitted_params
          render json: serialize_details, status: :ok
        else
          render json: @match.errors, status: :unprocessable_entity
        end
      end

      def check_in
        authorize @match, :player?
        player = @tournament.players.find_by(account: current_account)
        if @match.check_in(player:)
          render json: serialize_details, status: :ok
        else
          render json: @match.errors, status: :unprocessable_entity
        end
      end

      def reset
        authorize @match.tournament, :update?
        if @match.reset
          render json: serialize_details, status: :ok
        else
          render json: @match.errors, status: :unprocessable_entity
        end
      end

      private

      def serialize_details
        Serializers::MatchDetails.new(@match).serializable_hash
      end

      def permitted_params
        params.require(:match).permit(:round_id, :tournament_id, :table_number, :player_one_id, :player_one_id, :winner_id, :loser_id, :phase_id, :bye)
      end

      def set_tournament
        @tournament ||= ::Tournament.find(params[:tournament_id])
        @tournament
      rescue ActiveRecord::RecordNotFound
        render json: { error: "Tournament not found" }, status: :not_found
      end

      def set_match
        @tournament ||= set_tournament
        @match = @tournament.matches.find(params[:id])
      end

      def set_matches
        @tournament ||= set_tournament
        @matches ||= @tournament.matches
        @matches ||= @tournament.matches.where(phase_id: params[:phase_id]) if params[:phase_id].present?
        @matches
      end
    end
    end
  end
