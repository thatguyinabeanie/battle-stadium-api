require 'swagger_helper'
require_relative '../../../../support/openapi/schema_helper'
require_relative '../../../../support/openapi/response_helper'

RSpec.describe 'api/v1/organizations/:organization_id/tournaments/:tournament_id/players' do
  let(:organization) { create(:organization) }
  let(:organization_id) { organization.id }
  let(:tournament) { create(:tournament, organization:) }
  let(:tournament_id) { tournament.id }

  path('/api/v1/organizations/{organization_id}/tournaments/{tournament_id}/players') do
    parameter name: :organization_id, in: :path, type: :integer, description: 'ID of the Organization', required: true
    parameter name: :tournament_id, in: :path, type: :integer, description: 'ID of the Tournament', required: true

    get('List Tournament Players') do
      tags 'Players'
      produces OpenApi::Response::JSON_CONTENT_TYPE
      description 'Retrieves a list of all Players'
      operationId 'listPlayers'

      response(200, 'successful') do
        let(:players) { create_list(:player, 10, tournament:) }

        schema type: :array, items: { '$ref' => '#/components/schemas/Player' }
        OpenApi::Response.set_example_response_metadata
        run_test!
      end

      response(404, 'not found') do
        let(:tournament_id) { 'invalid' }

        OpenApi::Response.set_example_response_metadata
        run_test!
      end
    end

    post('Create Tournament Player') do
      tags 'Players'
      produces 'application/json'
      consumes 'application/json'
      description 'Creates a new Player.'
      operationId 'postTournamentPlayer'

      parameter name: :player, in: :body, schema: {
        type: :object,
        properties: {
          player: {
            type: :object,
            title: 'postPlayer',
            properties: {
              user_id: { type: :integer },
              in_game_name: { type: :string }
            },
            required: %w[user_id in_game_name]
          }
        }
      }

      response(201, 'created') do
        let(:player) do
          {
            player: {
              user_id: create(:user).id,
              in_game_name: 'fuecocos-strongest-soldier'
            }
          }
        end

        schema '$ref' => '#/components/schemas/PlayerDetails'
        OpenApi::Response.set_example_response_metadata

        run_test!
      end

      response(422, 'unprocessable entity') do
        let(:player) do
          {
            player: {
              user_id: create(:user).id,
              team_sheet_submitted: false
            }
          }
        end

        OpenApi::Response.set_example_response_metadata
        run_test!
      end

      response(404, 'not found') do
        let(:tournament_id) { 'invalid' }
        let(:player) do
          {
            player: {
              user_id: create(:user).id
            }
          }
        end

        OpenApi::Response.set_example_response_metadata
        run_test!
      end
    end
  end

  path('/api/v1/organizations/{organization_id}/tournaments/{tournament_id}/players/{id}') do
    parameter name: :organization_id, in: :path, type: :integer, description: 'ID of the Organization', required: true
    parameter name: :tournament_id, in: :path, type: :integer, description: 'ID of the Tournament', required: true

    get('Show Tournament Player') do
      tags 'Players'
      produces 'application/json'
      description 'Retrieves a Player'
      operationId 'showTournamentPlayer'

      parameter name: :id, in: :path, type: :integer

      response(200, 'successful') do
        let(:player) { create(:player, tournament:) }
        let(:id) { player.user_id }

        schema '$ref' => '#/components/schemas/PlayerDetails'
        OpenApi::Response.set_example_response_metadata

        run_test!
      end
    end

    put('Update Tournament Player') do
      tags 'Players'
      produces 'application/json'
      consumes 'application/json'
      description 'Updates a Player.'
      operationId 'putTournamentPlayer'

      parameter name: :id, in: :path, type: :integer
      parameter name: :tournament_id, in: :path, type: :integer
      parameter name: :player, in: :body, schema: {
        type: :object,
        properties: {
          player: {
            type: :object,
            title: 'putPlayer',
            properties: {
              team_sheet_submitted: { type: :boolean }
            },
            required: %w[user_id team_sheet_submitted tournament_id]
          }
        }
      }

      response(200, 'successful') do
        let(:tournament_player) { create(:player, tournament:) }
        let(:id) { tournament_player.user_id }
        let(:player) do
          {
            player: {
              user_id: tournament_player.user_id,
              tournament_id: tournament.id,
              checked_in_at: Time.current.utc
            }
          }
        end

        schema '$ref' => '#/components/schemas/PlayerDetails'
        OpenApi::Response.set_example_response_metadata

        run_test!
      end
    end

    delete('Delete Tournament Player') do
      tags 'Players'
      produces 'application/json'
      description 'Deletes a Player.'
      operationId 'deleteTournamentPlayer'

      parameter name: :id, in: :path, type: :integer
      parameter name: :tournament_id, in: :path, type: :integer

      response(200, 'successful') do
        let(:player) { create(:player, tournament:) }
        let(:id) { player.user_id }

        OpenApi::Response.set_example_response_metadata

        run_test!
      end

      response(404, 'not found') do
        let(:id) { 'invalid' }

        OpenApi::Response.set_example_response_metadata

        run_test!
      end
    end
  end
end
