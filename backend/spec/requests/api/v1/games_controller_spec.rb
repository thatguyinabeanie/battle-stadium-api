require "swagger_helper"
require_relative "../../../support/auth/token_verifier_mock"

GAME_DETAIL_SCHEMA = "#/components/schemas/GameDetail".freeze

RSpec.describe Api::V1::GamesController do
  include Auth::TokenVerifier::Mock

  path("/games") do
    get("List Games") do
      tags "Games"
      produces OpenApi::Response::JSON_CONTENT_TYPE
      description "Retrieves a list of all games"
      operationId "listGames"

      security [Bearer: []]

      parameter VERCEL_TOKEN_HEADER_PARAMETER

      response(200, "successful") do
        include_context "with Request Specs - Vercel OIDC Token Verification"

        schema type: :object, properties: {
          data: { type: :array, items: { "$ref" => "#/components/schemas/Game" } },
          meta: { "$ref" => "#/components/schemas/Pagination" }
        }

        OpenApi::Response.set_example_response_metadata

        run_test! do # rubocop:disable RSpec/MultipleExpectations
          expect(response.body).to include("data")
          expect(response.body).to include("meta")
        end
      end
    end

    post("Create Game") do
      tags "Games"
      consumes OpenApi::Response::JSON_CONTENT_TYPE
      produces OpenApi::Response::JSON_CONTENT_TYPE
      description "Creates a new game."
      operationId "postGame"

      parameter name: :game, in: :body, schema: { "$ref" => "#/components/schemas/Game" }
      parameter VERCEL_TOKEN_HEADER_PARAMETER

      security [Bearer: []]

      response(201, "created") do
        let(:request_user) { create(:admin) }
        let(:game) { { game: { name: "New Game" } } }

        include_context "with Request Specs - Clerk JWT + Vercel OIDC Token Verification"
        schema "$ref" => GAME_DETAIL_SCHEMA

        OpenApi::Response.set_example_response_metadata

        run_test!
      end

      response(403, "forbidden") do
        let(:request_user) { create(:user) }
        let(:game) { { game: { name: "New Game" } } }

        include_context "with Request Specs - Clerk JWT + Vercel OIDC Token Verification"
        schema "$ref" => "#/components/schemas/Error"
        OpenApi::Response.set_example_response_metadata

        run_test!
      end

      response(400, "bad request") do
        let(:request_user) { create(:admin) }
        let(:game) { { title: "", genre: "" } }

        include_context "with Request Specs - Clerk JWT + Vercel OIDC Token Verification"
        schema "$ref" => "#/components/schemas/Error"
        OpenApi::Response.set_example_response_metadata

        run_test!
      end
    end
  end

  path("/games/{id}") do
    parameter name: :id, in: :path, type: :integer, description: "ID of the game", required: true
    parameter VERCEL_TOKEN_HEADER_PARAMETER

    let(:test_game) { create(:game, name: "Test Game") }
    let(:id) { test_game.id }

    get("Show Game") do
      tags "Games"
      produces OpenApi::Response::JSON_CONTENT_TYPE
      description "Retrieves a specific game by ID."
      operationId "getGame"

      parameter VERCEL_TOKEN_HEADER_PARAMETER

      security [Bearer: []]

      response(200, "successful") do
        include_context "with Request Specs - Vercel OIDC Token Verification"
        schema "$ref" => GAME_DETAIL_SCHEMA
        OpenApi::Response.set_example_response_metadata
        run_test!
      end

      response(404, NOT_FOUND) do
        let(:id) { "invalid" } # Define the id parameter here

        include_context "with Request Specs - Vercel OIDC Token Verification"
        OpenApi::Response.set_example_response_metadata

        run_test!
      end
    end

    patch("Update Game") do
      tags "Games"
      produces OpenApi::Response::JSON_CONTENT_TYPE
      consumes OpenApi::Response::JSON_CONTENT_TYPE
      description "Updates a game by ID."
      operationId "patchGame"

      parameter name: :game, in: :body, schema: { "$ref" => "#/components/schemas/Game" }
      parameter VERCEL_TOKEN_HEADER_PARAMETER
      security [Bearer: []]

      response(200, "successful") do
        let(:request_user) { create(:admin) }

        let(:game) { { game: { name: "Updated Game" } } }

        include_context "with Request Specs - Clerk JWT + Vercel OIDC Token Verification"
        schema "$ref" => GAME_DETAIL_SCHEMA

        OpenApi::Response.set_example_response_metadata

        run_test!
      end

      response(403, "forbidden") do
        let(:request_user) { create(:user) }
        let(:game) { { game: { name: "Updated Game" } } }

        include_context "with Request Specs - Clerk JWT + Vercel OIDC Token Verification"
        schema "$ref" => "#/components/schemas/Error"
        OpenApi::Response.set_example_response_metadata

        run_test!
      end

      response(404, NOT_FOUND) do
        let(:request_user) { create(:admin) }
        let(:id) { "invalid" }
        let(:game) { { game: { name: "Updated Game" } } }

        include_context "with Request Specs - Clerk JWT + Vercel OIDC Token Verification"
        schema "$ref" => "#/components/schemas/Error"
        OpenApi::Response.set_example_response_metadata

        run_test!
      end
    end

    delete("Delete Game") do
      tags "Games"
      produces OpenApi::Response::JSON_CONTENT_TYPE
      description "Deletes a game by ID."
      operationId "deleteGame"

      security [Bearer: []]
      parameter VERCEL_TOKEN_HEADER_PARAMETER
      response(200, "successful") do
        let(:request_user) { create(:admin) }

        include_context "with Request Specs - Clerk JWT + Vercel OIDC Token Verification"

        schema "$ref" => "#/components/schemas/Message"
        OpenApi::Response.set_example_response_metadata

        run_test!
      end

      response(403, "forbidden") do
        let(:request_user) { create(:user) }

        include_context "with Request Specs - Clerk JWT + Vercel OIDC Token Verification"

        schema "$ref" => "#/components/schemas/Error"
        OpenApi::Response.set_example_response_metadata

        run_test!
      end

      response(404, NOT_FOUND) do
        let(:request_user) { create(:admin) }
        let(:id) { "invalid" }

        include_context "with Request Specs - Clerk JWT + Vercel OIDC Token Verification"
        OpenApi::Response.set_example_response_metadata

        run_test!
      end
    end
  end
end
