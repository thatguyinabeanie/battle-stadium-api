require "swagger_helper"
require "support/auth/token_verifier_mock"

RSpec.describe Api::V1::Tournaments::MatchesController do
  include Auth::TokenVerifier::Mock

  path "/tournaments/{tournament_id}/matches" do
    parameter VERCEL_TOKEN_HEADER_PARAMETER
    parameter name: :tournament_id, in: :path, type: :string, description: "Tournament ID"

    get "Retrieves all matches for a tournament" do

      tags "Matches"
      produces "application/json"


      response "200", "matches found" do
        include_context "with Request Specs - Clerk JWT + Vercel OIDC Token Verification"
        schema type: :array,
               items: { "$ref" => "#/components/schemas/match" }

        let(:tournament) { create(:tournament) }
        let(:tournament_id) { tournament.id }
        let(:phase) { create(:swiss_phase, tournament:) }
        let(:round) { create(:round, phase:) }
        let(:matches) { create_list(:match, 3, tournament:, round:, phase:) }

        schema type: :array,
               items: { "$ref" => "#/components/schemas/Match" }
        OpenApi::Response.set_example_response_metadata

        run_test!
      end

      response "404", "tournament not found" do
        include_context "with Request Specs - Clerk JWT + Vercel OIDC Token Verification"
        let(:tournament_id) { "invalid" }

        OpenApi::Response.set_example_response_metadata

        run_test!
      end
    end


    path "/tournaments/{tournament_id}/matches/{id}" do
      parameter VERCEL_TOKEN_HEADER_PARAMETER
      parameter name: :tournament_id, in: :path, type: :string, description: "Tournament ID"
      parameter name: :id, in: :path, type: :string, description: "Match ID"

      get "Retrieves a match" do
        tags "Matches"
        produces "application/json"
        response "200", "match found" do
          include_context "with Request Specs - Clerk JWT + Vercel OIDC Token Verification"
          schema "$ref" => "#/components/schemas/match"

          let(:tournament_id) { create(:tournament).id }
          let(:id) { create(:match, tournament_id:).id }

          schema "$ref" => "#/components/schemas/Match"

          OpenApi::Response.set_example_response_metadata

          run_test!
        end

        response "404", "match not found" do
          include_context "with Request Specs - Clerk JWT + Vercel OIDC Token Verification"
          let(:tournament_id) { create(:tournament).id }
          let(:id) { "invalid" }

          OpenApi::Response.set_example_response_metadata

          run_test!
        end
      end

      patch "Updates a match" do
        tags "Matches"
        consumes "application/json"
        parameter name: :match, in: :body, schema: {
          type: :object,
          properties: {
            match: {
              type: :object,
              properties: {
                round_id: { type: :integer },
                table_number: { type: :integer },
                player_one_id: { type: :integer },
                player_two_id: { type: :integer },
                winner_id: { type: :integer },
                loser_id: { type: :integer },
                player_one_check_in: { type: :boolean },
                player_two_check_in: { type: :boolean },
                phase_id: { type: :integer },
                bye: { type: :boolean }
              }
            }
          },
          required: ["match"]
        }

        security [Bearer: []]

        response "200", "match updated" do
          include_context "with Request Specs - Clerk JWT + Vercel OIDC Token Verification"
          let(:tournament) { create(:tournament) }
          let(:phase) { create(:swiss_phase, tournament:) }
          let(:round) { create(:round, phase:) }
          let(:request_user) { tournament.organization.owner }
          let(:tournament_id) { tournament.id }
          let(:id) { create(:match, tournament:, phase:, round:).id }
          let(:match) { { match: { table_number: 2 } } }

          schema "$ref" => "#/components/schemas/Match"

          OpenApi::Response.set_example_response_metadata

          run_test!
        end

        response "422", "invalid request" do
          include_context "with Request Specs - Clerk JWT + Vercel OIDC Token Verification"
          let(:tournament) { create(:tournament) }
          let(:request_user) { tournament.organization.owner }
          let(:tournament_id) { tournament.id }
          let(:id) { create(:match, tournament_id:).id }
          let(:match) { { match: { table_number: nil } } }

          OpenApi::Response.set_example_response_metadata

          run_test!
        end
      end
    end
  end
end
