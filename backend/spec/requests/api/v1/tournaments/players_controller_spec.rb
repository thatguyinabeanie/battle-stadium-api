require "swagger_helper"
require "support/auth/token_verifier_mock"
RSpec.describe Api::V1::Tournaments::PlayersController do
  include Auth::TokenVerifier::Mock

  let(:organization) { create(:organization) }
  let(:organization_id) { organization.id }
  let(:tournament) { create(:tournament, organization:) }
  let(:tournament_id) { tournament.id }

  path("/tournaments/{tournament_id}/players") do
    parameter name: :tournament_id, in: :path, type: :integer, description: "ID of the Tournament", required: true
    parameter VERCEL_TOKEN_HEADER_PARAMETER

    get("List Tournament Players") do
      tags "Players"
      produces OpenApi::Response::JSON_CONTENT_TYPE
      description "Retrieves a list of all Players"
      operationId "listPlayers"

      security [Bearer: []]

      response(200, "successful") do
        let(:players) { create_list(:player, 10, tournament:) }

        include_context "with Request Specs - Clerk JWT + Vercel OIDC Token Verification"
        schema type: :array, items: { "$ref" => "#/components/schemas/Player" }
        OpenApi::Response.set_example_response_metadata
        run_test!
      end

      response(404, NOT_FOUND) do
        let(:tournament_id) { "invalid" }

        include_context "with Request Specs - Clerk JWT + Vercel OIDC Token Verification"
        OpenApi::Response.set_example_response_metadata
        run_test!
      end
    end

    post("Create Tournament Player") do
      tags "Players"
      produces OpenApi::Response::JSON_CONTENT_TYPE
      consumes OpenApi::Response::JSON_CONTENT_TYPE
      description "Creates a new Player."
      operationId "postTournamentPlayer"

      parameter name: :player, in: :body, schema: { "$ref" => "#/components/schemas/PlayerRequest" }

      security [Bearer: []]

      response(201, "created") do
        let(:player) { { user_id: request_user.id } }

        include_context "with Request Specs - Clerk JWT + Vercel OIDC Token Verification"
        schema "$ref" => "#/components/schemas/PlayerDetails"
        OpenApi::Response.set_example_response_metadata

        run_test!
      end

      response(403, "forbidden") do
        let(:player) { { user_id: create(:user).id } }

        include_context "with Request Specs - Clerk JWT + Vercel OIDC Token Verification"
        schema "$ref" => "#/components/schemas/Error"
        OpenApi::Response.set_example_response_metadata

        run_test!
      end

      response(404, NOT_FOUND) do
        let(:tournament_id) { "invalid" }
        let(:player) { { user_id: request_user.id} }

        include_context "with Request Specs - Clerk JWT + Vercel OIDC Token Verification"

        OpenApi::Response.set_example_response_metadata
        run_test!
      end
    end
  end

  path("/tournaments/{tournament_id}/players/{id}") do
    parameter name: :tournament_id, in: :path, type: :integer, description: "ID of the Tournament", required: true
    parameter name: :id, in: :path, type: :integer, description: "ID of the Player", required: true
    parameter VERCEL_TOKEN_HEADER_PARAMETER

    let(:tournament_player) { create(:player, tournament:) }
    let(:id) { tournament_player.user_id }

    get("Show Tournament Player") do
      tags "Players"
      produces OpenApi::Response::JSON_CONTENT_TYPE
      description "Retrieves a Player"
      operationId "showTournamentPlayer"

      security [Bearer: []]

      response(200, "successful") do
        include_context "with Request Specs - Vercel OIDC Token Verification"
        schema "$ref" => "#/components/schemas/PlayerDetails"
        OpenApi::Response.set_example_response_metadata

        run_test!
      end
    end

    patch("Update Tournament Player") do
      tags "Players"
      produces OpenApi::Response::JSON_CONTENT_TYPE
      consumes OpenApi::Response::JSON_CONTENT_TYPE
      description "Updates a Player."
      operationId "putTournamentPlayer"

      parameter name: :player, in: :body, schema: { "$ref" => "#/components/schemas/PlayerRequest" }

      security [Bearer: []]

      response(200, "successful") do
        let(:request_user) { tournament_player.user }

        let(:player) do
          {
            in_game_name: "fuecocos-strongest-soldier"
          }
        end

        include_context "with Request Specs - Clerk JWT + Vercel OIDC Token Verification"

        schema "$ref" => "#/components/schemas/PlayerDetails"
        OpenApi::Response.set_example_response_metadata

        run_test!
      end
    end

    delete("Delete Tournament Player") do
      tags "Players"
      produces OpenApi::Response::JSON_CONTENT_TYPE
      description "Deletes a Player."
      operationId "deleteTournamentPlayer"

      security [Bearer: []]

      response(200, "successful") do
        let(:request_user) { tournament_player.user }

        include_context "with Request Specs - Clerk JWT + Vercel OIDC Token Verification"
        OpenApi::Response.set_example_response_metadata
        run_test!
      end

      response(404, NOT_FOUND) do
        let(:request_user) { tournament_player.user }
        let(:id) { "invalid" }

        include_context "with Request Specs - Clerk JWT + Vercel OIDC Token Verification"

        OpenApi::Response.set_example_response_metadata
        run_test!
      end
    end
  end
end
