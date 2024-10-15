
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
      parameter name: :account_id, in: :query, type: :integer, description: "Account ID", required: false

      security [Bearer: []]

      response(200, "lists all unarchived profiles") do
        let(:profiles) { create_list(:profile, 3) }

        schema type: :array,
                items: { "$ref" => "#/components/schemas/Profile" }
        OpenApi::Response.set_example_response_metadata

        run_test!
      end

      response(200, "lists profiles by account_id") do
        let!(:account) do
          account = create(:account)

          account.profiles += create_list(:profile, 10, archived_at: nil) + [create(:profile, account: , archived_at: Time.current - 1.month)]
          account.save
          account
        end

        let(:account_id) { account.id }

        schema type: :array,
               items: { "$ref" => "#/components/schemas/Profile" }
        OpenApi::Response.set_example_response_metadata

        run_test! do
          expect(response.parsed_body.size).to eq(account.profiles.size - 1)
          account.profiles.filter { |p| p.archived_at.nil? }.each do |profile|
            expect(response.parsed_body.pluck("id")).to include(profile.id)
          end

          expect(response.body).not_to include(request_account.profiles.first.username)
        end
      end

      response(200, "lists profiles") do
        let(:other_accounts) { create_list(:account, 5) }
        let(:archived_profiles) { create_list(:profile, 3, account: request_account, archived_at: Time.current - 1.month) }
        let(:profiles) { create_list(:profile, 3, account: request_account, archived_at: nil) }
        let(:account_id) do
          request_account.profiles += archived_profiles + profiles
          request_account.save
          request_account.id
        end

        schema type: :array,
               items: { "$ref" => "#/components/schemas/Profile" }
        OpenApi::Response.set_example_response_metadata

        run_test! do
          expect(response.parsed_body.size).to eq(request_account.profiles.size)

          request_account.profiles.each do |profile|
            expect(response.parsed_body.pluck("id")).to include(profile.id)
          end

          other_accounts.map(&:profiles).flatten.each do |profile|
            # Add your code here to handle each profile
            expect(response.parsed_body.pluck("id")).not_to include(profile.id)
          end
        end
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

      response(404, "profile not found") do
        let(:slug) { "nonexistent_slug" }

        schema type: :object,
               properties: {
                 error: { type: :string }
               },
               required: %w[error]
        OpenApi::Response.set_example_response_metadata

        run_test!
      end
    end
  end

end
