require "swagger_helper"
require "support/auth/token_verifier_mock"

TOURNAMENT_DETAILS_SCHEMA_COMPONENT = "#/components/schemas/TournamentDetails".freeze
RSpec.describe Api::V1::TournamentsController do
  include Auth::TokenVerifier::Mock

  path("/tournaments") do
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
        run_test! do # rubocop:disable RSpec/MultipleExpectations
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

        run_test! do # rubocop:disable RSpec/MultipleExpectations
          expect(request.query_parameters).to include("page" => "2", "per_page" => "2")
          expect(response.body).to include("data")
          expect(response.body).to include("meta")
        end
      end
    end
  end

  path("/tournaments/{id}") do
    parameter name: :id, in: :path, type: :integer, description: "ID of the Tournament", required: true

    let(:organization) { create(:organization) }
    let(:organization_id) { organization.id }
    let(:org_tournament) { create(:tournament, organization:) }
    let(:id) { org_tournament.id }

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
        let(:id) { "invalid" }

        include_context "with Request Specs - Vercel OIDC Token Verification"
        OpenApi::Response.set_example_response_metadata
        run_test!
      end
    end
  end
end
