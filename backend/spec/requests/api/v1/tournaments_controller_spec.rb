require 'swagger_helper'
require_relative '../../../support/openapi/schema_helper'
require_relative '../../../support/openapi/response_helper'

TOURNAMENT_DETAILS_SCHEMA_COMPONENT = '#/components/schemas/TournamentDetails'.freeze
RSpec.describe Api::V1::TournamentsController do
  path('/api/v1/tournaments') do

    get('List Tournaments') do
      tags 'Tournaments'
      produces OpenApi::Response::JSON_CONTENT_TYPE
      description 'Retrieves a list of all Tournaments'
      operationId 'listTournaments'

      parameter name: :organization_id, in: :body, type: :integer, description: 'ID of the Organization', required: false, schema: { type: :integer }

      response(200, 'Successful') do
        let(:organizations) { create_list(:organization, 5) }
        let(:tournaments) { organizations.flat_map { |org| create_list(:tournament, 10, organization: org) } }

        schema type: :array, items: { '$ref' => '#/components/schemas/Tournament' }

        OpenApi::Response.set_example_response_metadata
        run_test!
      end
    end

    get('List Organization Tournaments') do
      tags 'Tournaments'
      produces OpenApi::Response::JSON_CONTENT_TYPE
      description 'Retrieves a list of all Tournaments'
      operationId 'listTournaments'

      parameter name: :organization_id, in: :body, type: :integer, description: 'ID of the Organization', required: false, schema: { type: :integer }

      response(200, 'Successful') do
        let(:organization) { create(:organization) }
        let(:organization_id) { organization.id }
        let(:organizations) { create_list(:organization, 5) + [organization] }
        let(:tournamentts) { organizations.flat_map { |org| create_list(:tournament, 10, organization: org) } }

        schema type: :array, items: { '$ref' => '#/components/schemas/Tournament' }

        OpenApi::Response.set_example_response_metadata
        run_test!
      end
    end

    post('Create Tournament') do
      tags 'Tournaments'
      produces OpenApi::Response::JSON_CONTENT_TYPE
      consumes OpenApi::Response::JSON_CONTENT_TYPE
      description 'Creates a new Tournament.'
      operationId 'postTournament'
      parameter name: :tournament, in: :body, schema: { '$ref' => '#/components/schemas/TournamentPostRequest' }

      response(201, 'created') do
        let(:organization) { create(:organization) }
        let(:owner) { organization.owner }
        let(:organization_id) { organization.id }
        let(:game) { create(:game) }
        let(:format) { create(:format, game:) }
        let(:tournament) do
          {
            tournament: {
              organization_id: organization.id,
              name: 'new_tournament',
              game_id: game.id,
              format_id: format.id
            }
          }
        end

        schema '$ref' => TOURNAMENT_DETAILS_SCHEMA_COMPONENT

        OpenApi::Response.set_example_response_metadata
        run_test!
      end

      response(422, 'unprocessable entity') do
        let(:organization) { create(:organization) }
        let(:organization_id) { organization.id }
        let(:tournament) do
          {
            tournament: {
              name: 'new_tournament',
              start_at: Time.zone.now,
              end_date: 1.week.ago
            }
          }
        end

        OpenApi::Response.set_example_response_metadata
        run_test!
      end
    end
  end

  path('/api/v1/tournaments/{id}') do
    parameter name: :id, in: :path, type: :integer, description: 'ID of the Tournament', required: true

    let(:organization) { create(:organization) }
    let(:organization_id) { organization.id }
    let(:org_tournament) { create(:tournament, organization:) }
    let(:id) { org_tournament.id }

    get('Show Tournament') do
      tags 'Tournaments'
      produces OpenApi::Response::JSON_CONTENT_TYPE
      description 'Retrieves a specific Tournament.'
      operationId 'getTournament'

      response(200, 'successful') do
        schema '$ref' => TOURNAMENT_DETAILS_SCHEMA_COMPONENT
        OpenApi::Response.set_example_response_metadata
        run_test!
      end

      response(404, NOT_FOUND) do
        let(:id) { 'invalid' }

        OpenApi::Response.set_example_response_metadata
        run_test!
      end
    end

    put('Update Tournament') do
      tags 'Tournaments'
      produces OpenApi::Response::JSON_CONTENT_TYPE
      consumes OpenApi::Response::JSON_CONTENT_TYPE
      description 'Updates a Tournament.'
      operationId 'putTournament'

      parameter name: :tournament, in: :body, schema: { '$ref' => '#/components/schemas/TournamentRequest' }

      response(200, 'successful') do
        let(:game) { create(:game) }
        let(:format) { create(:format, game:) }
        let(:tournament) do
          {
            name: 'new_tournament',
            game_id: game.id,
            format_id: format.id
          }
        end

        schema '$ref' => TOURNAMENT_DETAILS_SCHEMA_COMPONENT

        OpenApi::Response.set_example_response_metadata
        run_test!
      end
    end

    delete('Delete Tournament') do
      tags 'Tournaments'
      produces OpenApi::Response::JSON_CONTENT_TYPE
      description 'Deletes a Tournament.'
      operationId 'deleteTournament'

      response(200, 'successful') do
        let(:org_tournament) { create(:tournament) }
        let(:id) { org_tournament.id }

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
