require_relative '../../../../serializer/match_serializer'

module Api
  module V1
    module Tournaments
      class MatchesController < ApplicationController
        before_action :set_tournament
        before_action :set_matches, only: %i[index create]
        before_action :set_match, only: %i[show update destroy]

        def index
          render json: @tournament.matches, each_serializer: Serializer::Match, status: :ok
        end

        def show
          render json: serialize_details, status: :ok
        end

        def create
          @match = @matches.new permitted_params.merge(tournament_id: @tournament.id)
          if @match.save
            render json: serialize_details, status: :created
          else
            render json: @match.errors, status: :unprocessable_entity
          end
        rescue ActionController::ParameterMissing => e
          render json: { error: e.message }, status: :bad_request
        end

        def update
          if @match.update! permitted_params
            render json: serialize_details, status: :ok
          else
            render json: @match.errors, status: :unprocessable_entity
          end
        end

        def destroy
          @match.destroy!
          render json: { message: 'Match deleted' }, status: :ok
        end

        private

        def serialize_details
          Serializer::MatchDetails.new(@match).serializable_hash
        end

        def permitted_params
          params.require(:match).permit(:round_id, :tournament_id, :table_number, :player1_id, :player2_id, :winner_id, :loser_id, :player_one_check_in, :player_two_check_in)
        end

        def set_tournament
          @tournament ||= ::Tournaments::Tournament.find(params[:tournament_id])
          @tournament
        rescue ActiveRecord::RecordNotFound
          render json: { error: 'Tournament not found' }, status: :not_found
        end

        def set_match
          @match = @tournament.matches.find(params[:id])
        end

        def set_matches
          @matches ||= @tournament.matches
          @matches
        end
      end
    end
  end
end
