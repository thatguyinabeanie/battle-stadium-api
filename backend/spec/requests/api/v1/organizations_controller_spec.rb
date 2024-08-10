require 'swagger_helper'
require_relative '../../../support/openapi/schema_helper'
require_relative '../../../support/openapi/response_helper'

ORGANIZATION_DETAIL_SCHEMA = '#/components/schemas/Organization'.freeze
DESCRIPTION = 'the bomb dot com'.freeze

RSpec.describe Api::V1::OrganizationsController do
  path('/api/v1/organizations') do
    get('List Organizations') do
      tags 'Organizations'
      produces OpenApi::Response::JSON_CONTENT_TYPE
      operationId 'listOrganizations'

      response(200, 'successful') do
        schema type: :array, items: { '$ref' => '#/components/schemas/Organization' }

        OpenApi::Response.set_example_response_metadata

        run_test!
      end
    end

    post('Create Organization') do
      tags 'Organizations'
      consumes OpenApi::Response::JSON_CONTENT_TYPE
      produces OpenApi::Response::JSON_CONTENT_TYPE
      description 'Creates a new organization.'
      operationId 'postOrganization'

      parameter name: :organization, in: :body, schema: { '$ref' => '#/components/schemas/Organization' }

      response(201, 'created') do
        let(:owner) { create(:user) }
        let(:organization) do
          {
            name: 'New Organization',
            description: DESCRIPTION,
            owner_id: owner.id
          }
        end

        schema '$ref' => ORGANIZATION_DETAIL_SCHEMA
        OpenApi::Response.set_example_response_metadata
        run_test!
      end
    end
  end

  path('/api/v1/organizations/{id}') do
    parameter name: :id, in: :path, type: :integer, required: true
    let(:org) { create(:organization) }
    let(:id) { org.id }

    get('Show Organization') do
      tags 'Organizations'
      produces OpenApi::Response::JSON_CONTENT_TYPE
      description 'Retrieves a specific organization.'
      operationId 'getOrganization'

      response(200, 'successful') do
        schema '$ref' => ORGANIZATION_DETAIL_SCHEMA
        OpenApi::Response.set_example_response_metadata
        run_test!
      end

      response(404, NOT_FOUND) do
        let(:id) { 'invalid' }

        OpenApi::Response.set_example_response_metadata

        run_test!
      end
    end

    patch('Update Organization') do
      tags 'Organizations'
      produces OpenApi::Response::JSON_CONTENT_TYPE
      consumes OpenApi::Response::JSON_CONTENT_TYPE
      description 'Updates an existing organization.'
      operationId 'patchOrganization'

      parameter name: :organization, in: :body, schema: { '$ref' => '#/components/schemas/Organization' }

      response(200, 'successful') do
        let(:id) { create(:organization).id }
        let(:organization) do
          {
            name: 'Updated Organization',
            description: DESCRIPTION
          }
        end

        schema '$ref' => ORGANIZATION_DETAIL_SCHEMA
        OpenApi::Response.set_example_response_metadata
        run_test!
      end

      response(404, NOT_FOUND) do
        let(:id) { -1 }
        let(:organization) do
          {
            name: 'Updated Organization',
            description: DESCRIPTION
          }
        end

        OpenApi::Response.set_example_response_metadata

        run_test!
      end
    end

    delete('Delete Organization') do
      tags 'Organizations'
      produces OpenApi::Response::JSON_CONTENT_TYPE
      description 'Deletes an organization.'
      operationId 'deleteOrganization'

      response(200, 'Organization deleted') do
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

  path('/api/v1/organizations/{id}/staff') do
    parameter name: :id, in: :path, type: :integer, required: true
    let(:org) { create(:organization_with_staff, staff_count: 5) }
    let(:id) { org.id }

    get('List Organization Staff') do
      tags 'Organizations'
      produces OpenApi::Response::JSON_CONTENT_TYPE
      description 'Retrieves a list of staff members for a specific organization.'
      operationId 'getOrganizationStaff'

      response(200, 'successful') do
        schema type: :array, items: { '$ref' => '#/components/schemas/User' }
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

  path('/api/v1/organizations/{id}/tournaments') do
    parameter name: :id, in: :path, type: :integer, required: true
    let(:org) { create(:organization_with_staff, staff_count: 5) }
    let(:id) { org.id }

    post('Create Tournament') do
      tags 'Organizations'
      consumes OpenApi::Response::JSON_CONTENT_TYPE
      produces OpenApi::Response::JSON_CONTENT_TYPE
      description 'Creates a new tournament for a given organization.'
      operationId 'postOrganizationTournament'

      parameter name: :tournament, in: :body, schema: { '$ref' => '#/components/schemas/TournamentDetails' }

      response(201, 'created') do
        let(:game) { create(:game) }
        let(:format) { create(:format, game:) }
        let(:tournament) do
          {
            tournament: {
              name: 'New Tournament',
              start_at: Time.now.iso8601,
              end_at: 1.day.from_now,
              game_id: game.id,
              format_id: format.id,
              autostart: false,
              player_cap: 32,
              registration_start_at: Time.now.iso8601,
              registration_end_at: 1.day.from_now.iso8601,
              late_registration: false,
              open_team_sheets: false,
              teamlists_required: false
            }
          }
        end

        schema '$ref' => '#/components/schemas/Tournament'
        OpenApi::Response.set_example_response_metadata
        run_test!
      end

      response(400, 'bad request') do
        let(:tournament) { {} }

        OpenApi::Response.set_example_response_metadata
        run_test!
      end
    end
  end

  path('/api/v1/organizations/{id}/tournaments/{tournament_id}') do
    parameter name: :id, in: :path, type: :integer, required: true
    parameter name: :tournament_id, in: :path, type: :integer, required: true

    let(:org) { create(:organization_with_staff, staff_count: 5) }
    let(:id) { org.id }
    let(:tour) { create(:tournament, organization: org) }
    let(:tournament_id) { tour.id }

    let(:game) { create(:game) }
    let(:format) { create(:format, game:) }

    let(:tournament) do
      {
        tournament: {
          name: 'Updated Tournament',
          start_at: Time.now.iso8601,
          end_at: 1.day.from_now,
          game_id: game.id,
          format_id: format.id,
          autostart: false,
          player_cap: 32,
          registration_start_at: Time.now.iso8601,
          registration_end_at: 1.day.from_now.iso8601,
          late_registration: false,
          open_team_sheets: false,
          teamlists_required: false
        }
      }
    end

    patch('Update Tournament') do
      tags 'Organizations'
      consumes OpenApi::Response::JSON_CONTENT_TYPE
      produces OpenApi::Response::JSON_CONTENT_TYPE
      description 'Updates an existing tournament for a given organization.'
      operationId 'patchOrganizationTournament'

      parameter name: :tournament, in: :body, schema: { '$ref' => '#/components/schemas/TournamentDetails' }

      response(200, 'successful') do
        schema '$ref' => '#/components/schemas/Tournament'
        OpenApi::Response.set_example_response_metadata
        run_test!
      end

      response(404, 'not found') do
        let(:tour) { create(:tournament) }
        let(:tournament_id) { tour.id }

        OpenApi::Response.set_example_response_metadata
        run_test!
      end

      response(400, 'bad request') do
        let(:tournament) { {} }

        OpenApi::Response.set_example_response_metadata
        run_test!
      end
    end
  end
end
