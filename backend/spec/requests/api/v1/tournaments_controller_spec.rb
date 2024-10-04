require "swagger_helper"
require "support/auth/token_verifier_mock"

TOURNAMENT_DETAILS_SCHEMA_COMPONENT = "#/components/schemas/TournamentDetails".freeze
RSpec.describe Api::V1::TournamentsController do
  include Auth::TokenVerifier::Mock

  path("/tournaments") do
    parameter VERCEL_TOKEN_HEADER_PARAMETER
    get("List Tournaments") do
      tags "Tournaments"
      produces OpenApi::Response::JSON_CONTENT_TYPE
      description "Retrieves a list of all Tournaments"
      operationId "listTournaments"

      parameter name: :organization_id, in: :body, type: :integer, description: "ID of the Organization", required: false, schema: { type: :integer }
      parameter PAGE_PARAMETER
      parameter PER_PAGE_PARAMETER

      security [Bearer: []]

      response(200, "Successful") do
        let(:organizations) { create_list(:organization, 5) }
        let(:tournaments) { organizations.flat_map { |org| create_list(:tournament, 10, organization: org) } }

        let(:page) { 2 }
        let(:per_page) { 2 }

        include_context "with Request Specs - Vercel OIDC Token Verification"

        schema type: :object, properties: {
          data: { type: :array, items: { "$ref" => "#/components/schemas/Tournament" } },
          meta: { "$ref" => "#/components/schemas/Pagination" }
        }

        # OpenApi::Response.set_example_response_metadata
        run_test! do
          expect(request.query_parameters).to include("page" => "2", "per_page" => "2")
          expect(response.body).to include("data")
          expect(response.body).to include("meta")
        end
      end
    end

    get("List Organization Tournaments") do
      tags "Tournaments"
      produces OpenApi::Response::JSON_CONTENT_TYPE
      description "Retrieves a list of all Tournaments"
      operationId "listTournaments"

      parameter name: :organization_id, in: :body, type: :integer, description: "ID of the Organization", required: false, schema: { type: :integer }
      parameter PAGE_PARAMETER
      parameter PER_PAGE_PARAMETER

      security [Bearer: []]
      response(200, "Successful") do
        let(:organization) { create(:organization) }
        let(:organization_id) { organization.id }
        let(:organizations) { create_list(:organization, 5) + [organization] }
        let(:tournaments) { organizations.flat_map { |org| create_list(:tournament, 10, organization: org) } }
        let(:page) { 2 }
        let(:per_page) { 2 }

        include_context "with Request Specs - Vercel OIDC Token Verification"

        schema type: :object, properties: {
          data: { type: :array, items: { "$ref" => "#/components/schemas/Tournament" } },
          meta: { "$ref" => "#/components/schemas/Pagination" }
        }

        OpenApi::Response.set_example_response_metadata

        run_test! do
          expect(request.query_parameters).to include("page" => "2", "per_page" => "2")
          expect(response.body).to include("data")
          expect(response.body).to include("meta")
        end
      end
    end
  end

  path("/tournaments/{tournament_id}") do
    parameter name: :tournament_id, in: :path, type: :integer, description: "ID of the Tournament", required: true
    parameter VERCEL_TOKEN_HEADER_PARAMETER

    let(:organization) { create(:organization) }
    let(:organization_id) { organization.id }
    let(:org_tournament) { create(:tournament, organization:) }
    let(:tournament_id) { org_tournament.id }

    get("Show Tournament") do
      tags "Tournaments"
      produces OpenApi::Response::JSON_CONTENT_TYPE
      description "Retrieves a specific Tournament."
      operationId "getTournament"

      security [Bearer: []]
      response(200, "successful") do
        include_context "with Request Specs - Vercel OIDC Token Verification"
        schema "$ref" => TOURNAMENT_DETAILS_SCHEMA_COMPONENT
        OpenApi::Response.set_example_response_metadata
        run_test!
      end

      response(404, NOT_FOUND) do
        let(:tournament_id) { "invalid" }

        include_context "with Request Specs - Vercel OIDC Token Verification"
        OpenApi::Response.set_example_response_metadata
        run_test!
      end
    end
  end

  path("/tournaments/{tournament_id}/start") do
    parameter name: :tournament_id, in: :path, type: :integer, description: "ID of the Tournament", required: true
    parameter VERCEL_TOKEN_HEADER_PARAMETER

    let(:organization) { create(:organization) }
    let(:organization_id) { organization.id }
    let(:org_tournament) { create(:tournament, :with_phases, :with_players_with_team_and_checked_in, organization:) }
    let(:tournament_id) { org_tournament.id }

    post("Start Tournament") do
      tags "Tournaments"
      produces OpenApi::Response::JSON_CONTENT_TYPE
      description "Starts a specific Tournament."
      operationId "startTournament"

      security [Bearer: []]
      response(200, "successful") do
        let(:request_user) { organization.owner }

        include_context "with Request Specs - Clerk JWT + Vercel OIDC Token Verification"
        schema "$ref" => TOURNAMENT_DETAILS_SCHEMA_COMPONENT
        OpenApi::Response.set_example_response_metadata
        run_test!
      end

      response(404, NOT_FOUND) do
        let(:tournament_id) { "invalid" }

        include_context "with Request Specs - Clerk JWT + Vercel OIDC Token Verification"
        OpenApi::Response.set_example_response_metadata
        run_test!
      end
    end
  end
end
