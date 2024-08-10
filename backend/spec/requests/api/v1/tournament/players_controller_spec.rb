require 'swagger_helper'
require_relative '../../../../support/openapi/schema_helper'
require_relative '../../../../support/openapi/response_helper'

RSpec.describe Api::V1::Tournaments::PlayersController do
  let(:organization) { create(:organization) }
  let(:organization_id) { organization.id }
  let(:tournament) { create(:tournament, organization:) }
  let(:tournament_id) { tournament.id }

  path('/api/v1/tournaments/{tournament_id}/players') do
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

      response(404, NOT_FOUND) do
        let(:tournament_id) { 'invalid' }

        OpenApi::Response.set_example_response_metadata
        run_test!
      end
    end

    post('Create Tournament Player') do
      tags 'Players'
      produces OpenApi::Response::JSON_CONTENT_TYPE
      consumes OpenApi::Response::JSON_CONTENT_TYPE
      description 'Creates a new Player.'
      operationId 'postTournamentPlayer'

      parameter name: :player, in: :body, schema: { '$ref' => '#/components/schemas/PlayerRequest' }

      response(201, 'created') do
        let(:player) do
          {
            user_id: create(:user).id
          }
        end

        schema '$ref' => '#/components/schemas/PlayerDetails'
        OpenApi::Response.set_example_response_metadata

        run_test!
      end

      response(404, NOT_FOUND) do
        let(:tournament_id) { 'invalid' }
        let(:player) { { user_id: create(:user).id } }

        OpenApi::Response.set_example_response_metadata
        run_test!
      end
    end
  end

  path('/api/v1/tournaments/{tournament_id}/players/{id}') do
    parameter name: :tournament_id, in: :path, type: :integer, description: 'ID of the Tournament', required: true
    parameter name: :id, in: :path, type: :integer, description: 'ID of the Player', required: true

    let(:tournament_player) { create(:player, tournament:) }
    let(:id) { tournament_player.user_id }

    get('Show Tournament Player') do
      tags 'Players'
      produces OpenApi::Response::JSON_CONTENT_TYPE
      description 'Retrieves a Player'
      operationId 'showTournamentPlayer'

      response(200, 'successful') do
        schema '$ref' => '#/components/schemas/PlayerDetails'
        OpenApi::Response.set_example_response_metadata

        run_test!
      end
    end

    patch('Update Tournament Player') do
      tags 'Players'
      produces OpenApi::Response::JSON_CONTENT_TYPE
      consumes OpenApi::Response::JSON_CONTENT_TYPE
      description 'Updates a Player.'
      operationId 'putTournamentPlayer'

      parameter name: :player, in: :body, schema: { '$ref' => '#/components/schemas/PlayerRequest' }

      response(200, 'successful') do
        let(:id) { tournament_player.user_id }
        let(:player) do
          {
            in_game_name: 'fuecocos-strongest-soldier'
          }
        end

        schema '$ref' => '#/components/schemas/PlayerDetails'
        OpenApi::Response.set_example_response_metadata

        run_test!
      end
    end

    delete('Delete Tournament Player') do
      tags 'Players'
      produces OpenApi::Response::JSON_CONTENT_TYPE
      description 'Deletes a Player.'
      operationId 'deleteTournamentPlayer'

      response(200, 'successful') do
        OpenApi::Response.set_example_response_metadata
        run_test!
      end

      response(404, NOT_FOUND) do
        let(:id) { 'invalid' }

        OpenApi::Response.set_example_response_metadata
        run_test!
      end
    end
  end
end
