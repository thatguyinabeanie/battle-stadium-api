
require "swagger_helper"
require "support/auth/token_verifier_mock"

RSpec.describe Api::V1::UserProfilesController do

  include Auth::TokenVerifier::Mock
  include_context "with Request Specs - Vercel OIDC Token Verification"

  path "/user_profiles" do
    parameter VERCEL_TOKEN_HEADER_PARAMETER

    get("Retrieves all profiles") do
      tags "Profiles"
      produces "application/json"
      operationId "listProfiles"

      response(200, "profiles found") do
        let(:user_profiles) { create_list(:user_profile, 3) }

        schema type: :array,
                items: { "$ref" => "#/components/schemas/UserProfile" }
        OpenApi::Response.set_example_response_metadata

        run_test!
      end
    end
  end

  path "/user_profiles/{slug}" do
    parameter VERCEL_TOKEN_HEADER_PARAMETER
    parameter name: :slug, in: :path, type: :string, description: "Username", required: true

    get("Retrieves a user profile") do
      tags "Profiles"
      produces "application/json"
      operationId "getProfile"

      response(200, "user profile found") do
        let(:request_user) { create(:user) }
        let(:slug) { request_user.default_profile.slug }

        schema "$ref" => "#/components/schemas/UserProfile"

        OpenApi::Response.set_example_response_metadata

        run_test!

      end
    end
  end

end
