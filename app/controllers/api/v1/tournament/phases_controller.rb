require_relative '../../../../serializer/phase_serializer'

module Api
  module V1
    module Tournament
      class PhasesController < ApplicationController
        before_action :set_tournament
        before_action :set_phases, only: %i[index create]
        before_action :set_phase, only: %i[show update destroy]

        def index
          render json: @phases, each_serializer: Serializer::Phase, status: :ok
        end

        def show
          render json: serialize_phase_details, status: :ok
        end

        def create # rubocop:disable Metrics/AbcSize
          klass = case params[:phase][:type]
                  when Phase::Swiss.to_s
                    Phase::Swiss
                  when Phase::SingleElimination.to_s
                    Phase::SingleElimination
                  else
                    raise ActionController::BadRequest, 'Invalid phase type'
                  end

          @phase = klass.create! permitted_params.merge(tournament_id: @tournament.id)
          @phases << @phase
          if @phase.save
            render json: serialize_phase_details, status: :created
          else
            render json: @phase.errors, status: :unprocessable_entity
          end
        rescue ActionController::ParameterMissing => e
          render json: { error: e.message }, status: :bad_request
        end

        def update
          if @phase.update! permitted_params
            render json: serialize_phase_details, status: :ok
          else
            render json: @phase.errors, status: :unprocessable_entity
          end
        end

        def destroy
          @phase.destroy!
          render json: { message: 'Phase deleted' }, status: :ok
        end

        private

        def serialize_phase_details
          Serializer::PhaseDetails.new(@phase).serializable_hash
        end

        def set_tournament
          @tournament = ::Tournament::Tournament.find(params[:tournament_id])
          @tournament
        rescue ActiveRecord::RecordNotFound
          render json: { error: 'Tournament not found' }, status: :not_found
        end

        def set_phases
          @tournament ||= set_tournament
          @phases = @tournament.phases
          @phases
        end

        def set_phase
          @phases ||= set_phases
          @phase = @phases.find(params[:id])
          @phase
        rescue ActiveRecord::RecordNotFound
          render json: { error: 'Phase not found' }, status: :not_found
        end

        def permitted_params
          params.require(:phase).permit(:name, :number_of_rounds, :best_of, :criteria, :type)
        end
      end
    end
  end
end
