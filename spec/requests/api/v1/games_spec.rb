require 'swagger_helper'
require_relative '../../../support/openapi/schema_helper'
require_relative '../../../support/openapi/response_helper'

GAME_DETAIL_SCHEMA = '#/components/schemas/GameDetail'.freeze

RSpec.describe 'api/v1/games' do
  path('/api/v1/games') do
    get('List Games') do
      tags 'Games'
      produces OpenApi::Response::JSON_CONTENT_TYPE
      description 'Retrieves a list of all games'
      operationId 'listGames'
      response(200, 'successful') do
        schema type: :array, items: { '$ref' => '#/components/schemas/Game' }

        OpenApi::Response.set_example_response_metadata

        run_test!
      end
    end

    post('Create Game') do
      tags 'Games'
      consumes OpenApi::Response::JSON_CONTENT_TYPE
      produces OpenApi::Response::JSON_CONTENT_TYPE
      description 'Creates a new game.'
      operationId 'postGame'

      parameter name: :game, in: :body, schema: {
        type: :object,
        properties: {
          game: {
            type: :object,
            title: 'postGame',
            properties: {
              name: { type: :string }
            },
            required: %w[name]
          }
        },
        required: %w[game]
      }

      response(201, 'created') do
        let(:game) { { game: { name: 'New Game' } } }

        schema '$ref' => GAME_DETAIL_SCHEMA

        OpenApi::Response.set_example_response_metadata

        run_test!
      end

      response(400, 'bad reqiest') do
        let(:game) { { title: '', genre: '' } }

        OpenApi::Response.set_example_response_metadata

        run_test!
      end
    end
  end

  path('/api/v1/games/{id}') do
    # You'll want to customize the parameter types...
    parameter name: :id, in: :path, type: :string, description: 'ID of the game'

    get('Show Game') do
      tags 'Games'
      produces OpenApi::Response::JSON_CONTENT_TYPE
      description 'Retrieves a specific game by ID.'
      operationId 'getGame'

      response(200, 'successful') do
        let(:id) { Game.create(name: 'Existing Game').id }

        schema '$ref' => GAME_DETAIL_SCHEMA

        OpenApi::Response.set_example_response_metadata

        run_test!
      end

      response(404, NOT_FOUND) do
        let(:id) { 'invalid' } # Define the id parameter here

        OpenApi::Response.set_example_response_metadata

        run_test!
      end
    end

    patch('Update Game') do
      tags 'Games'
      produces OpenApi::Response::JSON_CONTENT_TYPE
      consumes OpenApi::Response::JSON_CONTENT_TYPE
      description 'Updates a game by ID.'
      operationId 'patchGame'

      parameter name: :game, in: :body, schema: {
        type: :object,
        properties: {
          game: {
            type: :object,
            properties: {
              name: { type: :string }
            },
            required: %w[name]
          }
        },
        required: %w[game]
      }

      response(200, 'successful') do
        let(:id) { Game.create(name: 'Existing Game').id }
        let(:game) { { game: { name: 'Updated Game' } } }

        schema '$ref' => GAME_DETAIL_SCHEMA

        OpenApi::Response.set_example_response_metadata

        run_test!
      end

      response(404, NOT_FOUND) do
        let(:id) { 'invalid' }
        let(:game) { { game: { name: 'Updated Game' } } }

        OpenApi::Response.set_example_response_metadata

        run_test!
      end
    end

    delete('Delete Game') do
      tags 'Games'
      produces OpenApi::Response::JSON_CONTENT_TYPE
      description 'Deletes a game by ID.'
      operationId 'deleteGame'

      response(200, 'successful') do
        let(:game) { create(:game, name: 'Test Game', slug: 'test-game') }
        let(:id) { game.id }

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
