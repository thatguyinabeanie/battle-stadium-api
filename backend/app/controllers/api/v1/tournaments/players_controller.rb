require_relative '../../../../serializer/player_serializer'

module Api
  module V1
    module Tournaments
      class PlayersController < ApplicationController
        before_action :set_tournament
        before_action :set_players, only: %i[index create]
        before_action :set_player, only: %i[show update destroy]

        def index
          render json: @players, each_serializer: Serializer::Player, status: :ok
        end

        def show
          render json: serialize_player_details, status: :ok
        end

        def create
          @player = @players.create! permitted_params.merge(tournament_id: @tournament.id)
          if @player.save
            render json: serialize_player_details, status: :created
          else
            render json: @player.errors, status: :unprocessable_entity
          end
        rescue ActionController::ParameterMissing => e
          render json: { error: e.message }, status: :bad_request
        end

        def update
          if @player.update! permitted_params
            render json: serialize_player_details, status: :ok
          else
            render json: @player.errors, status: :unprocessable_entity
          end
        end

        def destroy
          @player.destroy!
          render json: { message: 'Player deleted' }, status: :ok
        end

        private

        def serialize_player_details
          Serializer::PlayerDetails.new(@player).serializable_hash
        end

        def set_players
          @tournament ||= set_tournament
          @players = @tournament.players
          @players
        rescue ActiveRecord::RecordNotFound
          render json: { error: 'Tournament not found' }, status: :not_found
        end

        def set_player
          @players ||= set_players
          @player = @players.find_by!(user_id: params[:id])
        rescue ActiveRecord::RecordNotFound
          render json: { error: 'Player not found' }, status: :not_found
        end

        def set_tournament
          @tournament ||= ::Tournaments::Tournament.find(params[:tournament_id])
          @tournament
        rescue ActiveRecord::RecordNotFound
          render json: { error: 'Tournament not found' }, status: :not_found
        end

        def permitted_params
          params.require(:player).permit(:user_id, :username, :in_game_name, organization_id: params[:organization_id])
        end
      end
    end
  end
end