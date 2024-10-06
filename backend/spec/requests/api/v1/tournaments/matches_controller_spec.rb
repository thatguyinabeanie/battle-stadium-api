require "swagger_helper"

RSpec.describe Api::V1::Tournaments::MatchesController do
  path "/api/v1/tournaments/{tournament_id}/matches" do
    parameter name: :tournament_id, in: :path, type: :string, description: "Tournament ID"

    get "Retrieves all matches for a tournament" do
      tags "Matches"
      produces "application/json"
      response "200", "matches found" do
        schema type: :array,
               items: { "$ref" => "#/components/schemas/match" }

        let(:tournament_id) { create(:tournament).id }

        run_test!
      end

      response "404", "tournament not found" do
        let(:tournament_id) { "invalid" }

        run_test!
      end
    end

    post "Creates a match for a tournament" do
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
            },
            required: %w[round_id table_number player_one_id player_two_id]
          }
        },
        required: ["match"]
      }

      response "201", "match created" do
        let(:tournament_id) { create(:tournament).id }
        let(:match) { { match: attributes_for(:match) } }

        run_test!
      end

      response "422", "invalid request" do
        let(:tournament_id) { create(:tournament).id }
        let(:match) { { match: { round_id: nil } } }

        run_test!
      end
    end
  end

  path "/api/v1/tournaments/{tournament_id}/matches/{id}" do
    parameter name: :tournament_id, in: :path, type: :string, description: "Tournament ID"
    parameter name: :id, in: :path, type: :string, description: "Match ID"

    get "Retrieves a match" do
      tags "Matches"
      produces "application/json"
      response "200", "match found" do
        schema "$ref" => "#/components/schemas/match"

        let(:tournament_id) { create(:tournament).id }
        let(:id) { create(:match, tournament_id:).id }

        run_test!
      end

      response "404", "match not found" do
        let(:tournament_id) { create(:tournament).id }
        let(:id) { "invalid" }

        run_test!
      end
    end

    put "Updates a match" do
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

      response "200", "match updated" do
        let(:tournament_id) { create(:tournament).id }
        let(:id) { create(:match, tournament_id:).id }
        let(:match) { { match: { table_number: 2 } } }

        run_test!
      end

      response "422", "invalid request" do
        let(:tournament_id) { create(:tournament).id }
        let(:id) { create(:match, tournament_id:).id }
        let(:match) { { match: { table_number: nil } } }

        run_test!
      end
    end

    delete "Deletes a match" do
      tags "Matches"
      response "200", "match deleted" do
        let(:tournament_id) { create(:tournament).id }
        let(:id) { create(:match, tournament_id:).id }

        run_test!
      end

      response "404", "match not found" do
        let(:tournament_id) { create(:tournament).id }
        let(:id) { "invalid" }

        run_test!
      end
    end
  end
end
