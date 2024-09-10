require "swagger_helper"
require_relative "../../../support/clerk_jwt/token_verifier_mock"

GAME_DETAIL_SCHEMA = "#/components/schemas/GameDetail".freeze

RSpec.describe Api::V1::GamesController do
  include ClerkJwt::TokenVerifier::Mock

  path("/api/v1/games") do
    get("List Games") do
      tags "Games"
      produces OpenApi::Response::JSON_CONTENT_TYPE
      description "Retrieves a list of all games"
      operationId "listGames"

      response(200, "successful") do
        schema type: :array, items: { "$ref" => "#/components/schemas/Game" }

        OpenApi::Response.set_example_response_metadata

        run_test!
      end
    end

    post("Create Game") do
      tags "Games"
      consumes OpenApi::Response::JSON_CONTENT_TYPE
      produces OpenApi::Response::JSON_CONTENT_TYPE
      description "Creates a new game."
      operationId "postGame"

      parameter name: :game, in: :body, schema: { "$ref" => "#/components/schemas/Game" }

      security [Bearer: []]

      response(201, "created") do
        let(:request_user) { create(:admin) }
        let(:game) { { game: { name: "New Game" } } }

        include_context "with Clerk SDK Mock"
        schema "$ref" => GAME_DETAIL_SCHEMA

        OpenApi::Response.set_example_response_metadata

        run_test!
      end

      response(403, "forbidden") do
        let(:request_user) { create(:user) }
        let(:game) { { game: { name: "New Game" } } }

        include_context "with Clerk SDK Mock"
        schema "$ref" => "#/components/schemas/Error"
        OpenApi::Response.set_example_response_metadata

        run_test!
      end

      response(400, "bad request") do
        let(:request_user) { create(:admin) }
        let(:game) { { title: "", genre: "" } }

        include_context "with Clerk SDK Mock"
        schema "$ref" => "#/components/schemas/Error"
        OpenApi::Response.set_example_response_metadata

        run_test!
      end
    end
  end

  path("/api/v1/games/{id}") do
    # You'll want to customize the parameter types...
    parameter name: :id, in: :path, type: :integer, description: "ID of the game", required: true
    let(:test_game) { create(:game, name: "Test Game") }
    let(:id) { test_game.id }

    get("Show Game") do
      tags "Games"
      produces OpenApi::Response::JSON_CONTENT_TYPE
      description "Retrieves a specific game by ID."
      operationId "getGame"

      response(200, "successful") do
        schema "$ref" => GAME_DETAIL_SCHEMA
        OpenApi::Response.set_example_response_metadata
        run_test!
      end

      response(404, NOT_FOUND) do
        let(:id) { "invalid" } # Define the id parameter here

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

      security [Bearer: []]

      response(200, "successful") do
        let(:request_user) { create(:admin) }

        let(:game) { { game: { name: "Updated Game" } } }

        include_context "with Clerk SDK Mock"
        schema "$ref" => GAME_DETAIL_SCHEMA

        OpenApi::Response.set_example_response_metadata

        run_test!
      end

      response(403, "forbidden") do
        let(:request_user) { create(:user) }
        let(:game) { { game: { name: "Updated Game" } } }

        include_context "with Clerk SDK Mock"
        schema "$ref" => "#/components/schemas/Error"
        OpenApi::Response.set_example_response_metadata

        run_test!
      end

      response(404, NOT_FOUND) do
        let(:request_user) { create(:admin) }
        let(:id) { "invalid" }
        let(:game) { { game: { name: "Updated Game" } } }

        include_context "with Clerk SDK Mock"
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

      response(200, "successful") do
        let(:request_user) { create(:admin) }

        include_context "with Clerk SDK Mock"

        schema "$ref" => "#/components/schemas/Message"
        OpenApi::Response.set_example_response_metadata

        run_test!
      end

      response(403, "forbidden") do
        let(:request_user) { create(:user) }

        include_context "with Clerk SDK Mock"

        schema "$ref" => "#/components/schemas/Error"
        OpenApi::Response.set_example_response_metadata

        run_test!
      end

      response(404, NOT_FOUND) do
        let(:request_user) { create(:admin) }
        let(:id) { "invalid" }

        include_context "with Clerk SDK Mock"
        OpenApi::Response.set_example_response_metadata

        run_test!
      end
    end
  end
end
