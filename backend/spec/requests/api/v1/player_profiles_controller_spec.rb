
require "swagger_helper"
require "support/auth/token_verifier_mock"

RSpec.describe Api::V1::PlayerProfilesController do

  include Auth::TokenVerifier::Mock
  include_context "with Request Specs - Vercel OIDC Token Verification"

  path "/profiles" do
    parameter VERCEL_TOKEN_HEADER_PARAMETER

    get("Retrieves all profiles") do
      tags "Profiles"
      produces "application/json"
      response(200, "profiles found") do
        let(:profiles) { create_list(:profile, 3) }

        schema type: :array,
                items: { "$ref" => "#/components/schemas/Profile" }
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

      response(200, "profile found") do
        let(:request_user) { create(:user) }
        let(:slug) { request_user.default_profile.slug }

        schema "$ref" => "#/components/schemas/Profile"

        OpenApi::Response.set_example_response_metadata

        run_test!

      end
    end
  end

end
