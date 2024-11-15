require "swagger_helper"
require "support/auth/token_verifier_mock"

RSpec.describe Api::V1::PlayersController do
  include Auth::TokenVerifier::Mock

  let(:organization) { create(:organization) }
  let(:organization_id) { organization.id }
  let(:tournament) { create(:tournament, organization:) }
  let(:tournament_id) { tournament.id }
  let(:in_game_name) { "pablo escobar" }

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

      parameter name: :in_game_name, in: :query, type: :string, required: true
      parameter name: :profile_id, in: :query, type: :integer, required: true
      parameter name: :pokemon_team_id, in: :query, type: :integer, required: false, nullable: true
      parameter name: :show_country_flag, in: :query, type: :boolean, required: true, nullable: true

      security [Bearer: []]

      response(201, "created") do

        let(:profile_id) { request_account.default_profile.id }
        let(:pokemon_team_id) { nil }
        let(:show_country_flag) { true }

        include_context "with Request Specs - Clerk JWT + Vercel OIDC Token Verification"
        schema "$ref" => "#/components/schemas/PlayerDetails"
        OpenApi::Response.set_example_response_metadata

        run_test!
      end

      response(409, "Already registered") do
        let(:profile) do
          prof = request_account.default_profile
          tournament.register!(profile: prof, in_game_name:)
          prof
        end

        let(:profile_id) { profile.id }
        let(:pokemon_team_id) { nil }
        let(:show_country_flag) { true }

        include_context "with Request Specs - Clerk JWT + Vercel OIDC Token Verification"
        schema "$ref" => "#/components/schemas/Error"
        OpenApi::Response.set_example_response_metadata

        run_test!
      end

      response(404, NOT_FOUND) do
        let(:tournament_id) { "invalid" }
        let(:profile_id) { -1 }
        let(:pokemon_team_id) { nil }
        let(:show_country_flag) { true }

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
    let(:id) { tournament_player.profile.id }

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
        let(:request_account) { tournament_player.profile.account }

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
        let(:request_account) { tournament_player.profile.account }

        include_context "with Request Specs - Clerk JWT + Vercel OIDC Token Verification"
        OpenApi::Response.set_example_response_metadata
        run_test!
      end

      response(404, NOT_FOUND) do
        let(:request_account) { tournament_player.profile.account }
        let(:id) { "invalid" }

        include_context "with Request Specs - Clerk JWT + Vercel OIDC Token Verification"

        OpenApi::Response.set_example_response_metadata
        run_test!
      end
    end
  end
end
