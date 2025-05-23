require "swagger_helper"
require "support/auth/token_verifier_mock"

ORGANIZATION_DETAIL_SCHEMA = "#/components/schemas/Organization".freeze
DESCRIPTION = "the bomb dot com".freeze

RSpec.describe Api::V1::OrganizationsController do
  include Auth::TokenVerifier::Mock

  let(:org) { create(:organization) }
  let(:owner) { org.owner }
  let(:slug) { org.slug }

  path("/organizations") do
    parameter VERCEL_TOKEN_HEADER_PARAMETER
    get("List Organizations") do
      tags "Organizations"
      produces OpenApi::Response::JSON_CONTENT_TYPE
      operationId "listOrganizations"

      parameter PAGE_PARAMETER
      parameter PER_PAGE_PARAMETER
      parameter name: :partner, in: :query, type: :boolean, required: false, description: "Filter by partner organizations"
      parameter name: :query, in: :query, type: :string, description: "Search query", required: false

      security [Bearer: []]

      response(200, "successful") do
        let(:organizations) { create_list(:organization, 5) }

        let(:page) { 2 }
        let(:per_page) { 2 }
        let(:partner) { true }

        include_context "with Request Specs - Vercel OIDC Token Verification"
        schema type: :object, properties: {
          data: { type: :array, items: { "$ref" => ORGANIZATION_DETAIL_SCHEMA } },
          meta: { "$ref" => "#/components/schemas/Pagination" }
        }

        OpenApi::Response.set_example_response_metadata

        run_test! do
          expect(request.query_parameters).to include("page" => "2", "per_page" => "2")
          expect(response.body).to include("data")
          expect(response.body).to include("meta")
        end
      end

      response(200, "Search Organizations") do
        let(:organizations) { create_list(:organization, 5) }
        let(:page) { 1 }
        let(:per_page) { 1000 }
        let(:query) { organizations.first.name }

        include_context "with Request Specs - Vercel OIDC Token Verification"
        schema type: :object, properties: {
          data: { type: :array, items: { "$ref" => ORGANIZATION_DETAIL_SCHEMA } },
          meta: { "$ref" => "#/components/schemas/Pagination" }
        }

        OpenApi::Response.set_example_response_metadata

        run_test! do
          expect(request.query_parameters).to include("query" => query)
          expect(response.body).to include("data")
          expect(response.body).to include("meta")
        end
      end
    end

    post("Create Organization") do
      tags "Organizations"
      consumes OpenApi::Response::JSON_CONTENT_TYPE
      produces OpenApi::Response::JSON_CONTENT_TYPE
      description "Creates a new organization."
      operationId "postOrganization"

      parameter name: :organization, required: true, in: :body, schema: { "$ref" => "#/components/schemas/Organization" }
      security [Bearer: []]

      response(201, "created") do
        let(:request_account) { create(:admin) }
        let(:organization) do
          {
            name: "New Organization",
            description: DESCRIPTION,
            owner_id: create(:account).id
          }
        end

        schema "$ref" => ORGANIZATION_DETAIL_SCHEMA
        include_context "with Request Specs - Clerk JWT + Vercel OIDC Token Verification"

        OpenApi::Response.set_example_response_metadata
        run_test!
      end

      response(403, "forbidden") do
        let(:request_account) { create(:account) }
        let(:organization) do
          {
            name: "New Organization",
            description: DESCRIPTION,
            owner_id: create(:account).id
          }
        end

        include_context "with Request Specs - Clerk JWT + Vercel OIDC Token Verification"

        schema "$ref" => "#/components/schemas/Error"
        OpenApi::Response.set_example_response_metadata
        run_test!
      end
    end
  end

  path("/organizations/{slug}") do
    parameter name: :slug, in: :path, type: :string, required: true
    parameter VERCEL_TOKEN_HEADER_PARAMETER

    get("Show Organization") do
      tags "Organizations"
      produces OpenApi::Response::JSON_CONTENT_TYPE
      description "Retrieves a specific organization."
      operationId "getOrganization"

      security [Bearer: []]
      response(200, "successful") do
        include_context "with Request Specs - Vercel OIDC Token Verification"
        schema "$ref" => ORGANIZATION_DETAIL_SCHEMA
        OpenApi::Response.set_example_response_metadata
        run_test!
      end

      response(404, NOT_FOUND) do
        let(:slug) { "invalid" }

        include_context "with Request Specs - Vercel OIDC Token Verification"
        schema "$ref" => "#/components/schemas/Error"
        OpenApi::Response.set_example_response_metadata

        run_test!
      end
    end

    patch("Update Organization") do
      tags "Organizations"
      produces OpenApi::Response::JSON_CONTENT_TYPE
      consumes OpenApi::Response::JSON_CONTENT_TYPE
      description "Updates an existing organization."
      operationId "patchOrganization"

      parameter name: :organization, in: :body, schema: { "$ref" => "#/components/schemas/Organization" }
      security [Bearer: []]

      response(200, "successful") do
        let(:request_account) { owner }
        let(:organization) do
          {
            name: "Updated Organization",
            description: DESCRIPTION
          }
        end

        include_context "with Request Specs - Clerk JWT + Vercel OIDC Token Verification"

        schema "$ref" => ORGANIZATION_DETAIL_SCHEMA
        OpenApi::Response.set_example_response_metadata
        run_test!
      end

      response(404, NOT_FOUND) do
        let(:request_account) { create(:admin) }

        let(:slug) { -1 }
        let(:organization) do
          {
            name: "Updated Organization",
            description: DESCRIPTION
          }
        end

        include_context "with Request Specs - Clerk JWT + Vercel OIDC Token Verification"
        schema "$ref" => "#/components/schemas/Error"
        OpenApi::Response.set_example_response_metadata

        run_test!
      end
    end

    delete("Delete Organization") do
      tags "Organizations"
      produces OpenApi::Response::JSON_CONTENT_TYPE
      description "Deletes an organization."
      operationId "deleteOrganization"

      security [Bearer: []]
      response(200, "Organization deleted") do
        let(:request_account) { create(:admin) }

        include_context "with Request Specs - Clerk JWT + Vercel OIDC Token Verification"
        schema "$ref" => "#/components/schemas/Message"
        OpenApi::Response.set_example_response_metadata
        run_test!
      end

      response(403, "forbidden") do
        let(:request_account) { create(:account) }

        include_context "with Request Specs - Clerk JWT + Vercel OIDC Token Verification"
        schema "$ref" => "#/components/schemas/Error"
        OpenApi::Response.set_example_response_metadata

        run_test!
      end

      response(404, NOT_FOUND) do
        let(:request_account) { create(:admin) }
        let(:slug) { "invalid" }

        include_context "with Request Specs - Clerk JWT + Vercel OIDC Token Verification"
        OpenApi::Response.set_example_response_metadata

        run_test!
      end
    end
  end

  path("/organizations/{slug}/staff") do
    parameter name: :slug, in: :path, type: :string, required: true
    parameter VERCEL_TOKEN_HEADER_PARAMETER


    get("List Organization Staff") do
      tags "Organizations"
      produces OpenApi::Response::JSON_CONTENT_TYPE
      description "Retrieves a list of staff members for a specific organization."
      operationId "listOrganizationStaff"
      security [Bearer: []]
      response(200, "successful") do
        include_context "with Request Specs - Vercel OIDC Token Verification"
        schema type: :array, items: { "$ref" => "#/components/schemas/Account" }
        OpenApi::Response.set_example_response_metadata
        run_test!
      end

      response(404, NOT_FOUND) do
        let(:slug) { "invalid" }

        include_context "with Request Specs - Vercel OIDC Token Verification"
        schema "$ref" => "#/components/schemas/Error"
        OpenApi::Response.set_example_response_metadata

        run_test!
      end
    end
  end

  path("/organizations/{slug}/tournaments") do
    parameter name: :slug, in: :path, type: :string, required: true
    parameter VERCEL_TOKEN_HEADER_PARAMETER

    get("List Organization Tournaments") do
      tags "Organizations"
      produces OpenApi::Response::JSON_CONTENT_TYPE
      description "Retrieves a list of tournaments for a specific organization."
      operationId "listOrganizationTournaments"

      security [Bearer: []]
      response(200, "successful") do
        include_context "with Request Specs - Vercel OIDC Token Verification"
        schema type: :array, items: { "$ref" => "#/components/schemas/TournamentDetails" }
        OpenApi::Response.set_example_response_metadata
        run_test!
      end

      response(404, NOT_FOUND) do
        let(:slug) { "invalid" }

        include_context "with Request Specs - Vercel OIDC Token Verification"
        OpenApi::Response.set_example_response_metadata

        run_test!
      end
    end

    post("Create Tournament") do
      tags "Organizations"
      consumes OpenApi::Response::JSON_CONTENT_TYPE
      produces OpenApi::Response::JSON_CONTENT_TYPE
      description "Creates a new tournament for a given organization."
      operationId "postOrganizationTournament"

      parameter name: :tournament, in: :body, schema: { "$ref" => "#/components/schemas/TournamentPostRequest" }

      security [Bearer: []]

      response(201, "Created by Org Owner") do
        let(:request_account) { owner }
        let(:game) { create(:game) }
        let(:format) { create(:format, game:) }
        let(:tournament) do
          {

              name: "New Tournament",
              start_at: Time.current.iso8601,
              end_at: 1.day.from_now,
              game_id: game.id,
              format_id: format.id,
              autostart: false,
              player_cap: 32,
              registration_start_at: Time.current.iso8601,
              registration_end_at: 1.day.from_now.iso8601,
              late_registration: false,
              open_team_sheets: false,
              teamlists_required: false

          }
        end

        include_context "with Request Specs - Clerk JWT + Vercel OIDC Token Verification"
        schema "$ref" => "#/components/schemas/TournamentDetails"
        OpenApi::Response.set_example_response_metadata
        run_test!
      end

      response(422, "unprocessable_entity") do
        let(:request_account) { owner }
        let(:game) { create(:game) }
        let(:format) { create(:format, game:) }
        let(:tournament) { {}
        }

        include_context "with Request Specs - Clerk JWT + Vercel OIDC Token Verification"

        OpenApi::Response.set_example_response_metadata
        run_test!
      end
    end
  end

end
