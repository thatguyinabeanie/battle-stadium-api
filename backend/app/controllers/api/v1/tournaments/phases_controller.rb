require_relative "../../../../serializers/phase_serializer"

module Api
  module V1
    module Tournaments
      class PhasesController < ApplicationController
        before_action :set_tournament
        before_action :set_phases, only: %i[index create]
        before_action :set_phase, only: %i[show update destroy]

        # before_action :authenticate_user, only: %i[create update destroy]
        def self.policy_class
          ::Tournaments::PhasePolicy
        end

        def index
          super
          render json: @phases, each_serializer: Serializers::Phase, status: :ok
        end

        def show
          super
          render json: serialize_phase_details, status: :ok
        end

        def create
          authorize @tournament, :update?

          klass = case params[:phase][:type]
                  when Phases::Swiss.to_s
                    Phases::Swiss
                  when Phases::SingleElimination.to_s
                    Phases::SingleElimination
                  else
                    raise ActionController::BadRequest, "Invalid phase type"
                  end

          @phase = klass.new permitted_params.merge(tournament_id: @tournament.id)

          if @phase.save
            render json: serialize_phase_details, status: :created
          else
            render json: @phase.errors, status: :unprocessable_entity
          end
        rescue ActionController::ParameterMissing => e
          render json: { error: e.message }, status: :bad_request
        end

        def update
          authorize @phase, :update?
          if @phase.update! permitted_params
            render json: serialize_phase_details, status: :ok
          else
            render json: @phase.errors, status: :unprocessable_entity
          end
        end

        def destroy
          authorize @phase, :destroy?
          @phase.destroy!
          render json: { message: "Phase deleted" }, status: :ok
        end

        private

        def serialize_phase_details
          Serializers::PhaseDetails.new(@phase).serializable_hash
        end

        def set_tournament
          @tournament = ::Tournaments::Tournament.find(params[:tournament_id])
          @tournament
        rescue ActiveRecord::RecordNotFound
          render json: { error: "Tournament not found" }, status: :not_found
        end

        def set_phases
          @tournament ||= set_tournament
          @phases = @tournament.phases
          @phases
        end

        def set_phase
          @phases ||= set_phases
          @phase = @phases.find(params[:id])
          @object = @phase
          @phase
        rescue ActiveRecord::RecordNotFound
          render json: { error: "Phase not found" }, status: :not_found
        end

        def permitted_params
          params.require(:phase).permit(:name, :number_of_rounds, :best_of, :type)
        end
      end
    end
  end
end
