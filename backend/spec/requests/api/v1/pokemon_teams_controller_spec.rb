require "swagger_helper"
require_relative "../../../support/auth/token_verifier_mock"
require_relative "../../../../app/serializers/pokemon_team_serializer"
require_relative "../../../../app/serializers/pokemon_serializer"

RSpec.describe Api::V1::PokemonTeamsController do
  include Auth::TokenVerifier::Mock
  path("/pokemon_teams") do
    get("List Public and NotArchived Pokemon Teams") do
      produces OpenApi::Response::JSON_CONTENT_TYPE
      description "Retrieves a list of all public and not archived pokemon teams"
      operationId "listPokemonTeams"

      security [Bearer: []]

      parameter VERCEL_TOKEN_HEADER_PARAMETER

      response(200, "successful") do

        let(:team) { create(:pokemon_team, :with_pokemon) }

        include_context "with Request Specs - Vercel OIDC Token Verification"

        schema type: :array, items: { "$ref" => "#/components/schemas/PokemonTeam" }

        OpenApi::Response.set_example_response_metadata

        run_test!
      end
    end

    post("Create Pokemon Team") do
      consumes OpenApi::Response::JSON_CONTENT_TYPE
      produces OpenApi::Response::JSON_CONTENT_TYPE
      description "Creates a new pokemon team."
      operationId "postPokemonTeam"

      security [Bearer: []]
      parameter VERCEL_TOKEN_HEADER_PARAMETER
      parameter POKEMON_TEAM_PARAMETER

      response(201, "created") do
        let(:pokemon_team) do
          game = create(:game)
          format = create(:format, game:)

          {
            name:  "New Pokemon Team",
            user_profile_id: request_user.default_profile.id,
            game_id: game.id,
            format_id: format.id,
            pokemon: build_list(:pokemon, 6)
          }
        end

        include_context "with Request Specs - Clerk JWT + Vercel OIDC Token Verification"
        schema "$ref" => "#/components/schemas/PokemonTeam"

        OpenApi::Response.set_example_response_metadata

        run_test!
      end

      response(422, "unprocessable entity") do

        let(:name) { "New Pokemon Team" }
        let(:user_profile_id) { nil }
        let(:game) { create(:game) }
        let(:game_id) { game.id }
        let(:format) { create(:format, game:) }
        let(:format_id) { format.id }
        let(:pokemon) { build_list(:pokemon, 6) }

        let(:pokemon_team) do
          {
            name:,
            user_profile_id:,
            game_id:,
            format_id:,
            pokemon:
          }
        end

        include_context "with Request Specs - Clerk JWT + Vercel OIDC Token Verification"

        OpenApi::Response.set_example_response_metadata

        run_test!
      end
    end
  end
end
