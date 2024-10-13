
require "swagger_helper"
require "support/auth/token_verifier_mock"

RSpec.describe Api::V1::ProfilesController do

  include Auth::TokenVerifier::Mock
  include_context "with Request Specs - Clerk JWT + Vercel OIDC Token Verification"

  path "/profiles" do
    get("Retrieves all profiles") do
      tags "Profiles"
      produces "application/json"
      operationId "listProfiles"

      parameter VERCEL_TOKEN_HEADER_PARAMETER
      response(200, "profiles found") do
        let(:profiles) { create_list(:profile, 3) }

        schema type: :array,
                items: { "$ref" => "#/components/schemas/Profile" }
        OpenApi::Response.set_example_response_metadata

        run_test!
      end
    end

    post("Creates a profile") do
      tags "Profiles"
      produces "application/json"
      operationId "createProfile"
      description "Creates a new profile"

      security [Bearer: []]

      parameter VERCEL_TOKEN_HEADER_PARAMETER
      parameter name: :user_name, in: :query, type: :string, description: "Username", required: true
      parameter name: :image_url, in: :query, type: :string, description: "Image URL", required: false

      response(201, "profile created") do
        let(:user_name) { "new_user" }

        schema "$ref" => "#/components/schemas/Profile"

        OpenApi::Response.set_example_response_metadata

        run_test!
      end

      response(422, "invalid request") do
        let(:user_name) { request_account.default_profile.username }

        schema type: :object,
               properties: {
                 error: { type: :array, items: { type: :string } }
               },
               required: %w[error]
        OpenApi::Response.set_example_response_metadata
        run_test!
      end
    end
  end

  path "/profiles/{slug}" do
    parameter VERCEL_TOKEN_HEADER_PARAMETER
    parameter name: :slug, in: :path, type: :string, description: "Username", required: true

    get("Retrieves a profile") do
      tags "Profiles"
      produces "application/json"
      operationId "getProfile"

      response(200, "profile found") do
        let(:request_account) { create(:account) }
        let(:slug) { request_account.default_profile.slug }

        schema "$ref" => "#/components/schemas/Profile"

        OpenApi::Response.set_example_response_metadata

        run_test!

      end
    end
  end

end
