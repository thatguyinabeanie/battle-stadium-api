module Api
  module V1
    module Tournaments
      class MatchGamesController < ApplicationController
        before_action :set_match
        before_action :set_match_game, only: %i[show update, report_winner, report_loser]
        def index
          authorize self.class, :index?

          render json: @match.match_games, each_serializer: Serializers::MatchGame, status: :ok
        end

        def show
          authorize @match_game.match, :show?
        end

        def report_winner
          authorize @match_game.match, :player?

          player = @tournament.players.find_by(id: match_game_params[:player_id])
          reporter = player.user == current_user ? player : current_user.default_profile

          @match.report_winner!(player:, reporter:)
          render json: @match_game, status: :ok, serializer: Serializers::MatchGame
        rescue StandardError => e
          render json: { error: e.message }, status: :unprocessable_entity
        end

        def report_loser
          authorize @match_game.match, :player?

          player = @tournament.players.find_by(id: match_game_params[:player_id])
          reporter = player.user == current_user ? player : current_user.default_profile

          @match.report_loser!(player:, reporter:)
          render json: @match_game, status: :ok, serializer: Serializers::MatchGame
        rescue StandardError => e
          render json: { error: e.message }, status: :unprocessable_entity
        end


        private

        def match_game_params
          params.require(:match_game).permit(:player_id)
        end

        def set_match
          @match ||= ::Tournaments::Match.find(params[:match_id])
          @match
        rescue ActiveRecord::RecordNotFound
          render json: { error: "Match not found" }, status: :not_found
        end

        def set_match_game
          @match ||= set_match
          @match_game = @match.match_games.find(params[:id])
          @match_game
        end
      end
    end
  end
end
