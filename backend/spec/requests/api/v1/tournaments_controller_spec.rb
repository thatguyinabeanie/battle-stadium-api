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
  end
end
