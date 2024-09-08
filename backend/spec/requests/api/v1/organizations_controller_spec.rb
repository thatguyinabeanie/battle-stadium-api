require "swagger_helper"
require_relative "../../../support/clerk_sdk_mock.rb"

ORGANIZATION_DETAIL_SCHEMA = "#/components/schemas/Organization".freeze
DESCRIPTION = "the bomb dot com".freeze

RSpec.describe Api::V1::OrganizationsController do
  include ClerkSdkMock

  let(:org) { create(:organization_with_staff, staff_count: 5) }
  let(:owner) { org.owner }
  let(:org_id) { org.id }

  path("/api/v1/organizations") do
    get("List Organizations") do
      tags "Organizations"
      produces OpenApi::Response::JSON_CONTENT_TYPE
      operationId "listOrganizations"

      response(200, "successful") do
        schema type: :array, items: { "$ref" => "#/components/schemas/Organization" }

        OpenApi::Response.set_example_response_metadata

        run_test!
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
        let(:request_user) { create(:admin) }
        let(:organization) do
          {
            name: "New Organization",
            description: DESCRIPTION,
            owner_id: create(:user).id
          }
        end

        schema "$ref" => ORGANIZATION_DETAIL_SCHEMA
        include_context "with Clerk SDK Mock"

        OpenApi::Response.set_example_response_metadata
        run_test!
      end

      response(403, "forbidden") do
        let(:request_user) { create(:user) }
        let(:organization) do
          {
            name: "New Organization",
            description: DESCRIPTION,
            owner_id: create(:user).id
          }
        end

        include_context "with Clerk SDK Mock"

        schema "$ref" => "#/components/schemas/Error"
        OpenApi::Response.set_example_response_metadata
        run_test!
      end
    end
  end

  path("/api/v1/organizations/{org_id}") do
    parameter name: :org_id, in: :path, type: :integer, required: true

    get("Show Organization") do
      tags "Organizations"
      produces OpenApi::Response::JSON_CONTENT_TYPE
      description "Retrieves a specific organization."
      operationId "getOrganization"

      response(200, "successful") do
        schema "$ref" => ORGANIZATION_DETAIL_SCHEMA
        OpenApi::Response.set_example_response_metadata
        run_test!
      end

      response(404, NOT_FOUND) do
        let(:org_id) { "invalid" }

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
        let(:request_user) { owner }
        let(:organization) do
          {
            name: "Updated Organization",
            description: DESCRIPTION
          }
        end

        include_context "with Clerk SDK Mock"

        schema "$ref" => ORGANIZATION_DETAIL_SCHEMA
        OpenApi::Response.set_example_response_metadata
        run_test!
      end

      response(404, NOT_FOUND) do
        let(:request_user) { create(:admin) }

        let(:org_id) { -1 }
        let(:organization) do
          {
            name: "Updated Organization",
            description: DESCRIPTION
          }
        end

        include_context "with Clerk SDK Mock"
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
        let(:request_user) { create(:admin) }

        include_context "with Clerk SDK Mock"
        schema "$ref" => "#/components/schemas/Message"
        OpenApi::Response.set_example_response_metadata
        run_test!
      end

      response(403, "forbidden") do
        let(:request_user) { create(:user) }

        include_context "with Clerk SDK Mock"
        schema "$ref" => "#/components/schemas/Error"
        OpenApi::Response.set_example_response_metadata

        run_test!
      end

      response(404, NOT_FOUND) do
        let(:request_user) { create(:admin) }
        let(:org_id) { "invalid" }

        include_context "with Clerk SDK Mock"
        OpenApi::Response.set_example_response_metadata

        run_test!
      end
    end
  end

  path("/api/v1/organizations/{org_id}/staff") do
    parameter name: :org_id, in: :path, type: :integer, required: true

    get("List Organization Staff") do
      tags "Organizations"
      produces OpenApi::Response::JSON_CONTENT_TYPE
      description "Retrieves a list of staff members for a specific organization."
      operationId "listOrganizationStaff"

      response(200, "successful") do
        schema type: :array, items: { "$ref" => "#/components/schemas/User" }
        OpenApi::Response.set_example_response_metadata
        run_test!
      end

      response(404, NOT_FOUND) do
        let(:org_id) { "invalid" }

        schema "$ref" => "#/components/schemas/Error"
        OpenApi::Response.set_example_response_metadata

        run_test!
      end
    end
  end

  path("/api/v1/organizations/{org_id}/tournaments") do
    parameter name: :org_id, in: :path, type: :integer, required: true

    get("List Organization Tournaments") do
      tags "Organizations"
      produces OpenApi::Response::JSON_CONTENT_TYPE
      description "Retrieves a list of tournaments for a specific organization."
      operationId "listOrganizationTournaments"

      response(200, "successful") do
        schema type: :array, items: { "$ref" => "#/components/schemas/TournamentDetails" }
        OpenApi::Response.set_example_response_metadata
        run_test!
      end

      response(404, NOT_FOUND) do
        let(:org_id) { "invalid" }

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

      parameter name: :tournament, in: :body, schema: { "$ref" => "#/components/schemas/TournamentDetails" }

      security [Bearer: []]

      response(201, "Created by Org Owner") do
        let(:request_user) { owner }
        let(:game) { create(:game) }
        let(:format) { create(:format, game:) }
        let(:tournament) do
          {
            tournament: {
              name: "New Tournament",
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

        include_context "with Clerk SDK Mock"
        schema "$ref" => "#/components/schemas/TournamentDetails"
        OpenApi::Response.set_example_response_metadata
        run_test!
      end

      response(400, "bad request") do
        let(:request_user) { owner }
        let(:tournament) { {} }

        include_context "with Clerk SDK Mock"

        OpenApi::Response.set_example_response_metadata
        run_test!
      end
    end
  end

  path("/api/v1/organizations/{org_id}/tournaments/{tournament_id}") do
    parameter name: :org_id, in: :path, type: :integer, required: true
    parameter name: :tournament_id, in: :path, type: :integer, required: true

    let(:tour) { create(:tournament, organization: org) }
    let(:tournament_id) { tour.id }

    let(:game) { create(:game) }
    let(:format) { create(:format, game:) }

    let(:tournament) do
      {
        tournament: {
          name: "Updated Tournament",
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

    patch("Update Tournament") do
      tags "Organizations"
      consumes OpenApi::Response::JSON_CONTENT_TYPE
      produces OpenApi::Response::JSON_CONTENT_TYPE
      description "Updates an existing tournament for a given organization."
      operationId "patchOrganizationTournament"

      parameter name: :tournament, in: :body, schema: { "$ref" => "#/components/schemas/TournamentDetails" }

      security [Bearer: []]

      response(200, "Updated by Organization Owner") do
        let(:request_user) { owner }

        include_context "with Clerk SDK Mock"

        schema "$ref" => "#/components/schemas/TournamentDetails"
        OpenApi::Response.set_example_response_metadata
        run_test!
      end

      response(404, "not found") do
        let(:request_user) { owner }
        let(:tournament_id) { -1 }

        include_context "with Clerk SDK Mock"


        include_context "with Clerk SDK Mock"
        OpenApi::Response.set_example_response_metadata
        run_test!
      end

      response(400, "bad request") do
        let(:request_user) { owner }

        let(:tournament) { {} }

        include_context "with Clerk SDK Mock"
        OpenApi::Response.set_example_response_metadata
        run_test!
      end
    end
  end
end
