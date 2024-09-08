require "rails_helper"
require "swagger_helper"
require_relative "../../../support/clerk_sdk_mock.rb"

USER_DETAILS_SCHEMA_COMPONENT = "#/components/schemas/UserDetails".freeze

RSpec.describe Api::V1::UsersController do
  include ClerkSdkMock

  path("/api/v1/users") do
    get("List Users") do
      tags "Users"
      produces OpenApi::Response::JSON_CONTENT_TYPE
      description "Retrieves a list of all Users"
      operationId "listUsers"

      response(200, "successful") do
        let(:users) { create_list(:user, 10) }

        schema type: :array, items: { "$ref" => "#/components/schemas/User" }

        OpenApi::Response.set_example_response_metadata

        run_test!
      end
    end

    post("Create User") do
      tags "Users"
      produces OpenApi::Response::JSON_CONTENT_TYPE
      consumes OpenApi::Response::JSON_CONTENT_TYPE
      description "Creates a new User."
      operationId "postUser"

      parameter name: :user, in: :body, schema: { "$ref" => "#/components/schemas/UserPostRequest" }

      security [Bearer: []]

      response(201, "created") do
        let(:request_user) { create(:admin) }
        let(:user) do
          {
            user: {
              username: Faker::Internet.unique.username,
              pronouns: "he/him",
              email: "new_user@example.com",
              first_name: "New ",
              last_name: "User",
            }
          }
        end

        include_context "with Clerk SDK Mock"

        schema "$ref" => USER_DETAILS_SCHEMA_COMPONENT

        OpenApi::Response.set_example_response_metadata

        run_test!
      end

      response(403, "forbidden") do
        let(:request_user) { create(:user) }

        let(:user) { {} }


        include_context "with Clerk SDK Mock"
        schema type: :object, properties: { error: { type: :string } }

        OpenApi::Response.set_example_response_metadata

        run_test!
      end

      response(422, "unprocessable entity") do
        let(:request_user) { create(:admin) }

        let(:user) do
          {
            user: {
              username: "",
              pronouns: "he/him",
              email: "new_user@example.com",
              first_name: "New ",
              last_name: "User",
            }
          }
        end

        include_context "with Clerk SDK Mock"

        OpenApi::Response.set_example_response_metadata

        run_test!
      end
    end
  end

  path("/api/v1/users/me") do
    get("Show Me") do
      tags "Users"
      produces OpenApi::Response::JSON_CONTENT_TYPE
      description "Retrieves the current User."
      operationId "getMe"

      security [Bearer: []]

      response(200, "successful") do
        let(:request_user) { create(:user) }

        include_context "with Clerk SDK Mock"

        schema "$ref" => "#/components/schemas/UserMe"

        OpenApi::Response.set_example_response_metadata

        run_test!
      end

      response(401, NOT_FOUND) do
        let(:request_user) { build(:user) }

        include_context "with Clerk SDK Mock"


        OpenApi::Response.set_example_response_metadata

        run_test!
      end
    end
  end

  path("/api/v1/users/{id}") do
    parameter name: :id, in: :path, type: :string, description: "ID of the User"

    get("Show User") do
      tags "Users"
      produces OpenApi::Response::JSON_CONTENT_TYPE
      description "Retrieves a specific User by ID."
      operationId "getUser"

      response(200, "successful") do
        let(:id) { create(:user, first_name: "Existing", last_name: "User").id }

        schema "$ref" => USER_DETAILS_SCHEMA_COMPONENT

        run_test!
      end

      response(404, NOT_FOUND) do
        let(:id) { "invalid" }

        OpenApi::Response.set_example_response_metadata

        run_test!
      end
    end

    patch("Update User") do
      tags "Users"
      produces OpenApi::Response::JSON_CONTENT_TYPE
      consumes OpenApi::Response::JSON_CONTENT_TYPE
      description "Updates an existing User."
      operationId "patchUser"

      parameter name: :user, in: :body, schema: { "$ref" => "#/components/schemas/UserDetails" }

      security [Bearer: []]

      response(200, "Updated by Admin") do
        let(:request_user) { create(:admin) }

        let(:user_object) { create(:user) }
        let(:id) { user_object.id }
        let(:user) do
          {
            username: Faker::Internet.unique.username,
            pronouns: "they/them",
            email: "updateduser@example.com",
            first_name: "Updated", last_name: "Userrrrr",
          }
        end

        include_context "with Clerk SDK Mock"

        schema "$ref" => USER_DETAILS_SCHEMA_COMPONENT

        OpenApi::Response.set_example_response_metadata

        run_test!
      end

      response(404, NOT_FOUND) do
        let(:request_user) { create(:admin) }

        let(:id) { "invalid" }
        let(:user) do
          {
            first_name: "Updated", last_name: "Userrrrr"
          }
        end

        include_context "with Clerk SDK Mock"

        OpenApi::Response.set_example_response_metadata

        run_test!
      end
    end

    delete("Delete User") do
      tags "Users"
      produces OpenApi::Response::JSON_CONTENT_TYPE
      describe "Deletes a User by ID."
      operationId "deleteUser"

      security [Bearer: []]

      response(200, "successful") do
        let(:request_user) { create(:admin) }

        let(:user) { create(:user) }
        let(:id) { user.id }

        include_context "with Clerk SDK Mock"

        OpenApi::Response.set_example_response_metadata

        run_test!
      end

      response(404, NOT_FOUND) do
        let(:request_user) { create(:admin) }

        let(:id) { "invalid" }

        include_context "with Clerk SDK Mock"


        OpenApi::Response.set_example_response_metadata

        run_test!
      end
    end
  end
end
