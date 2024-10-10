require "swagger_helper"
require_relative "../../../support/auth/token_verifier_mock"

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
  end
end
