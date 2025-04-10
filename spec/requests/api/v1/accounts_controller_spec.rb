require "rails_helper"
require "swagger_helper"
require "support/auth/token_verifier_mock"

USER_DETAILS_SCHEMA_COMPONENT = "#/components/schemas/AccountDetails".freeze

RSpec.describe Api::V1::AccountsController do
  include Auth::TokenVerifier::Mock

  path("/accounts") do
    parameter VERCEL_TOKEN_HEADER_PARAMETER

    get("List Accounts") do
      tags "Accounts"
      produces OpenApi::Response::JSON_CONTENT_TYPE
      description "Retrieves a list of all Accounts"
      operationId "listAccounts"

      security [Bearer: []]
      response(200, "successful") do
        let(:accounts) { create_list(:account, 10) }

        include_context "with Request Specs - Vercel OIDC Token Verification"

        schema type: :array, items: { "$ref" => "#/components/schemas/Account" }

        OpenApi::Response.set_example_response_metadata

        run_test!
      end
    end

    post("Create Account") do
      tags "Accounts"
      produces OpenApi::Response::JSON_CONTENT_TYPE
      consumes OpenApi::Response::JSON_CONTENT_TYPE
      description "Creates a new Account."
      operationId "postAccount"

      parameter name: :account, in: :body, schema: { "$ref" => "#/components/schemas/AccountPostRequest" }
      parameter name: :username, in: :query, type: :string, description: "Username"

      security [Bearer: []]

      response(201, "created") do
        let(:request_account) { create(:admin) }
        let(:username) { "new_user" }
        let(:account) do
          {
            account: {
              pronouns: "he/him",
              email: "new_user@example.com",
              first_name: "New ",
              last_name: "User",
            }
          }
        end

        include_context "with Request Specs - Clerk JWT + Vercel OIDC Token Verification"

        schema "$ref" => USER_DETAILS_SCHEMA_COMPONENT

        OpenApi::Response.set_example_response_metadata

        run_test!
      end

      response(403, "forbidden") do
        let(:request_account) { create(:account) }

        let(:username) { "new_user" }
        let(:account) { {} }


        include_context "with Request Specs - Clerk JWT + Vercel OIDC Token Verification"
        schema type: :object, properties: { error: { type: :string } }

        OpenApi::Response.set_example_response_metadata

        run_test!
      end

      response(422, "unprocessable entity") do
        let(:request_account) { create(:admin) }
        let(:username) { nil }
        let(:account) do
          {
            account: {
              pronouns: "he/him",
              email: "new_user@example.com",
              first_name: "New ",
              last_name: "User",
            }
          }
        end

        include_context "with Request Specs - Clerk JWT + Vercel OIDC Token Verification"

        OpenApi::Response.set_example_response_metadata

        run_test!
      end
    end
  end

  path("/accounts/me") do
    parameter VERCEL_TOKEN_HEADER_PARAMETER

    get("Show Me") do
      tags "Accounts"
      produces OpenApi::Response::JSON_CONTENT_TYPE
      description "Retrieves the current Account."
      operationId "getAccountMe"

      security [Bearer: []]

      response(200, "successful") do
        let(:request_account) { create(:account) }

        include_context "with Request Specs - Clerk JWT + Vercel OIDC Token Verification"

        schema "$ref" => "#/components/schemas/AccountMe"

        OpenApi::Response.set_example_response_metadata

        run_test!
      end

      response(401, "not authorized") do
        let(:request_account) { build(:account) }

        include_context "with Request Specs - Clerk JWT + Vercel OIDC Token Verification"

        OpenApi::Response.set_example_response_metadata

        run_test!
      end
    end
  end

  path("/accounts/{username}") do
    parameter name: :username, in: :path, type: :string, description: "The account's username"
    parameter VERCEL_TOKEN_HEADER_PARAMETER

    let(:existing_account)  { create(:account) }
    let(:username) { existing_account.username }

    get("Show Account") do
      tags "Accounts"
      produces OpenApi::Response::JSON_CONTENT_TYPE
      description "Retrieves a specific Account by username."
      operationId "getAccount"

      security [Bearer: []]

      response(200, "successful") do
        include_context "with Request Specs - Vercel OIDC Token Verification"
        schema "$ref" => USER_DETAILS_SCHEMA_COMPONENT
        run_test!
      end

      response(404, NOT_FOUND) do
        let(:username) { "invalid" }

        include_context "with Request Specs - Vercel OIDC Token Verification"
        OpenApi::Response.set_example_response_metadata

        run_test!
      end
    end

    patch("Update Account") do
      tags "Accounts"
      produces OpenApi::Response::JSON_CONTENT_TYPE
      consumes OpenApi::Response::JSON_CONTENT_TYPE
      description "Updates an existing Account."
      operationId "patchAccount"

      parameter name: :account, in: :body, schema: { "$ref" => "#/components/schemas/AccountDetails" }

      security [Bearer: []]

      response(200, "Updated by Admin") do
        let(:request_account) { create(:admin) }
        let(:account) do
          {
            pronouns: "they/them",
            email: "updateduser@example.com",
            first_name: "Updated", last_name: "User",
          }
        end

        include_context "with Request Specs - Clerk JWT + Vercel OIDC Token Verification"

        schema "$ref" => USER_DETAILS_SCHEMA_COMPONENT

        OpenApi::Response.set_example_response_metadata

        run_test!
      end

      response(404, NOT_FOUND) do
        let(:request_account) { create(:admin) }

        let(:username) { "invalid" }
        let(:account) do
          {
            first_name: "Updated", last_name: "User"
          }
        end

        include_context "with Request Specs - Clerk JWT + Vercel OIDC Token Verification"

        OpenApi::Response.set_example_response_metadata

        run_test!
      end
    end

    delete("Delete Account") do
      tags "Accounts"
      produces OpenApi::Response::JSON_CONTENT_TYPE
      describe "Deletes a Account by Username."
      operationId "deleteAccount"

      security [Bearer: []]

      response(200, "successful") do
        let(:request_account) { create(:admin) }

        include_context "with Request Specs - Clerk JWT + Vercel OIDC Token Verification"

        OpenApi::Response.set_example_response_metadata

        run_test!
      end

      response(404, NOT_FOUND) do
        let(:request_account) { create(:admin) }

        let(:username) { "invalid" }

        include_context "with Request Specs - Clerk JWT + Vercel OIDC Token Verification"

        OpenApi::Response.set_example_response_metadata

        run_test!
      end
    end
  end
end
