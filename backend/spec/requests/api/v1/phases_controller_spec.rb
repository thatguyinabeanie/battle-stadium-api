require "swagger_helper"
require "support/auth/token_verifier_mock"

PHASES_ENUM = %w[Phases::Swiss Phases::SingleElimination].freeze
PHASE_SWISS = "Phases::Swiss".freeze


RSpec.describe Api::V1::PhasesController do
  include Auth::TokenVerifier::Mock

  let(:tournament) { create(:tournament) }
  let(:owner) do
    owner = tournament.organization.owner
    owner.clerk_users << ClerkUser.new(account_id: owner.id, clerk_user_id: "user_#{owner.id}")
    owner
  end

  let(:tournament_id) { tournament.id }

  path("/tournaments/{tournament_id}/phases") do
    parameter name: :tournament_id, in: :path, type: :integer, description: "ID of the tournament", required: true
    parameter VERCEL_TOKEN_HEADER_PARAMETER

    get("List Tournament Phases") do
      tags "Phases"
      produces OpenApi::Response::JSON_CONTENT_TYPE
      description "Retrieves a list of all Phases"
      operationId "listTournamentPhases"

      security [Bearer: []]

      response(200, "successful") do
        let(:phases) { create_list(:swiss_phase, 2, tournament:) }

        include_context "with Request Specs - Vercel OIDC Token Verification"
        schema type: :array, items: { "$ref" => "#/components/schemas/Phase" }
        run_test!
      end

      response(404, NOT_FOUND) do
        let(:tournament_id) { "invalid" }

        include_context "with Request Specs - Vercel OIDC Token Verification"
        OpenApi::Response.set_example_response_metadata
        run_test!
      end
    end

    post("Create Tournament Phase") do
      tags "Phases"
      produces OpenApi::Response::JSON_CONTENT_TYPE
      consumes OpenApi::Response::JSON_CONTENT_TYPE
      description "Creates a new Tournament Phase."
      operationId "postTournamentPhase"

      parameter name: :phase, in: :body, schema: { "$ref" => "#/components/schemas/Phase" }

      security [Bearer: []]

      response(201, "created") do
        let(:request_account) { create(:admin) }
        let(:phase) do
          {
            name: "Swiss Round",
            number_of_rounds: 3,
            best_of: 3,
            type: PHASE_SWISS
          }
        end

        include_context "with Request Specs - Clerk JWT + Vercel OIDC Token Verification"
        schema "$ref" => "#/components/schemas/PhaseDetails"
        OpenApi::Response.set_example_response_metadata

        run_test!
      end

      response 404, NOT_FOUND do
        let(:request_account) { create(:admin) }
        let(:tournament_id) { "invalid" }
        let(:phase) do
          {
            phase: {
              number_of_rounds: 3,
              best_of: 3,
              type: PHASE_SWISS
            }
          }
        end

        include_context "with Request Specs - Clerk JWT + Vercel OIDC Token Verification"
        OpenApi::Response.set_example_response_metadata
        run_test!
      end
    end
  end

  path("/tournaments/{tournament_id}/phases/{id}") do
    parameter name: :tournament_id, in: :path, type: :integer, description: "ID of the tournament", required: true
    parameter name: :id, in: :path, type: :integer, required: true, description: "ID of the Phase"
    parameter VERCEL_TOKEN_HEADER_PARAMETER


    let(:tournament) { create(:tournament) }
    let(:tournament_id) { tournament.id }
    let(:tour_phase) { create(:swiss_phase, tournament:) }
    let(:id) { tour_phase.id }

    get("Show Tournament Phase") do
      tags "Phases"
      produces OpenApi::Response::JSON_CONTENT_TYPE
      description "Retrieves a Tournament Phase"
      operationId "showTournamentPhase"

      security [Bearer: []]
      response(200, "successful") do
        include_context "with Request Specs - Vercel OIDC Token Verification"
        schema "$ref" => "#/components/schemas/PhaseDetails"
        OpenApi::Response.set_example_response_metadata

        run_test!
      end

      response(404, NOT_FOUND) do
        let(:id) { "invalid" }

        include_context "with Request Specs - Vercel OIDC Token Verification"
        OpenApi::Response.set_example_response_metadata
        run_test!
      end
    end

    patch("Update Tournament Phase") do
      tags "Phases"
      produces OpenApi::Response::JSON_CONTENT_TYPE
      consumes OpenApi::Response::JSON_CONTENT_TYPE
      description "Updates a Tournament Phase."
      operationId "patchTournamentPhase"

      parameter name: :phase, in: :body, schema: { "$ref" => "#/components/schemas/Phase" }
      security [Bearer: []]

      response(200, "successful") do

        let(:request_account) { owner }

        let(:phase) do
          {
            name: "Swiss Round",
            number_of_rounds: 3,
            best_of: 3,
            type: PHASE_SWISS
          }
        end

        include_context "with Request Specs - Clerk JWT + Vercel OIDC Token Verification"
        schema "$ref" => "#/components/schemas/PhaseDetails"
        OpenApi::Response.set_example_response_metadata

        run_test!
      end

      response(404, NOT_FOUND) do
        let(:request_account) { owner }
        let(:id) { "invalid" }
        let(:phase) do
          {
            name: "Swiss Round",
            number_of_rounds: 3,
            best_of: 3,
            type: PHASE_SWISS
          }
        end

        include_context "with Request Specs - Clerk JWT + Vercel OIDC Token Verification"
        OpenApi::Response.set_example_response_metadata
        run_test!
      end
    end

    delete("Delete Tournament Phase") do
      tags "Phases"
      produces OpenApi::Response::JSON_CONTENT_TYPE
      description "Deletes a Tournament Phase."
      operationId "deleteTournamentPhase"

      security [Bearer: []]

      response(200, "successful") do
        let(:request_account) { owner }

        include_context "with Request Specs - Clerk JWT + Vercel OIDC Token Verification"

        OpenApi::Response.set_example_response_metadata
        run_test!
      end

      response(404, NOT_FOUND) do
        let(:request_account) { owner }
        let(:id) { "invalid" }

        include_context "with Request Specs - Clerk JWT + Vercel OIDC Token Verification"
        OpenApi::Response.set_example_response_metadata
        run_test!
      end
    end
  end
end
