require_relative "../../../../serializers/player_serializer"

module Api
  module V1
    module Tournaments
      class PlayersController < ApplicationController
        before_action :set_tournament
        before_action :set_players, only: %i[index create]
        before_action :set_player, only: %i[show update destroy]

        def self.policy_class
          ::Tournaments::PlayerPolicy
        end

        def index
          super
          render json: @players, each_serializer: Serializers::Player, status: :ok
        end

        def show
          super
          render json: serialize_player_details, status: :ok
        end

        def create
          @profile = Profile.find_by!(id: params[:profile_id])

          @player = @players.build tournament_id: @tournament.id, account_id: @profile.account.id, in_game_name: params[:in_game_name], profile_id: @profile.id
          @player.pokemon_team_id = params[:pokemon_team_id] if params[:pokemon_team_id].present?

          authorize @player, :create?

          if @player.save
            render json: serialize_player_details, status: :created
          else
            render json: {error: @player.errors.full_messages.to_sentence}, status: :unprocessable_entity
          end
        rescue ActiveRecord::RecordNotFound
          skip_authorization
          render json: { error: "Profile not found" }, status: :unprocessable_entity
        rescue Pundit::NotAuthorizedError => e
          skip_authorization
          render json: { error: e.message }, status: :forbidden
        rescue ActionController::ParameterMissing => e
          skip_authorization
          render json: { error: e.message }, status: :bad_request
        end

        def update
          authorize @player, :update?
          if @player.update permitted_params
            render json: serialize_player_details, status: :ok
          else
            render json: @player.errors, status: :unprocessable_entity
          end
        end

        def destroy
          authorize @player, :destroy?
          @player.destroy!
          render json: { message: "Player deleted" }, status: :ok
        end

        private

        def serialize_player_details
          Serializers::PlayerDetails.new(@player).serializable_hash
        end

        def set_players
          @tournament ||= set_tournament
          @players = @tournament.players
          @players
        rescue ActiveRecord::RecordNotFound
          render json: { error: "Tournament not found" }, status: :not_found
        end

        def set_player
          @players ||= set_players
          @player = @players.find_by!(profile_id: params[:id])
          @object = @player
          @player
        rescue ActiveRecord::RecordNotFound
          render json: { error: "Player not found" }, status: :not_found
        end

        def set_tournament
          @tournament ||= ::Tournaments::Tournament.find(params[:tournament_id])
          @tournament
        rescue ActiveRecord::RecordNotFound
          render json: { error: "Tournament not found" }, status: :not_found
        end

        def permitted_params
          params.require(:player).permit(:profile_id, :profile, :in_game_name, organization_id: params[:organization_id])
        end
      end
    end
  end
end
