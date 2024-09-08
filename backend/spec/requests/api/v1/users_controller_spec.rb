require "rails_helper"
require "swagger_helper"

USER_DETAILS_SCHEMA_COMPONENT = "#/components/schemas/UserDetails".freeze

RSpec.describe Api::V1::UsersController do
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
        let(:request_user) { create(:admin, :with_clerk_user) }
        let(:Authorization) { "Bearer mock_session_token_totally_random" }
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

        before do
          clerk_sdk_instance = instance_double(Clerk::SDK)
          session = {
            "userId" => request_user.clerk_users.first.clerk_user_id,
            "email" => request_user.email,
            "username" => request_user.username,
            "firstName" => request_user.first_name,
            "lastName" => request_user.last_name,
            "imageUrl" => request_user.image_url,
          }

          allow(Clerk::SDK).to receive(:new).and_return(clerk_sdk_instance)
          allow(clerk_sdk_instance).to receive_messages(verify_token: session, decode_token: (session))
        end

        schema "$ref" => USER_DETAILS_SCHEMA_COMPONENT

        OpenApi::Response.set_example_response_metadata

        run_test!
      end

      response(403, "forbidden") do
        let(:request_user) { create(:user, :with_clerk_user) }
        let(:Authorization) { "Bearer mock_session_token_totally_random" }
        let(:user) { {} }

        before do
          clerk_sdk_instance = instance_double(Clerk::SDK)
          session = {
            "email" => request_user.email,
            "username" => request_user.username,
            "firstName" => request_user.first_name,
            "lastName" => request_user.last_name,
            "imageUrl" => request_user.image_url,
            "userId" => request_user.clerk_users.first.clerk_user_id,

          }

          allow(Clerk::SDK).to receive(:new).and_return(clerk_sdk_instance)
          allow(clerk_sdk_instance).to receive_messages(verify_token: session, decode_token: (session))
        end



        schema type: :object, properties: { error: { type: :string } }

        OpenApi::Response.set_example_response_metadata

        run_test!
      end

      response(422, "unprocessable entity") do
        let(:request_user) { create(:admin, :with_clerk_user) }
        let(:Authorization) { "Bearer mock_session_token_totally_random" }
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

        before do
          clerk_sdk_instance = instance_double(Clerk::SDK)
          session = {
            "userId" => request_user.clerk_users.first.clerk_user_id,
            "email" => request_user.email,
            "username" => request_user.username,
            "firstName" => request_user.first_name,
            "lastName" => request_user.last_name,
            "imageUrl" => request_user.image_url,
          }

          allow(Clerk::SDK).to receive(:new).and_return(clerk_sdk_instance)
          allow(clerk_sdk_instance).to receive_messages(verify_token: session, decode_token: (session))
        end


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
        let(:request_user) { create(:user, :with_clerk_user) }
        let(:Authorization) { "Bearer mock_session_token_totally_random" }

        before do
          clerk_sdk_instance = instance_double(Clerk::SDK)
          session = {
            "userId" => request_user.clerk_users.first.clerk_user_id,
            "email" => request_user.email,
            "username" => request_user.username,
            "firstName" => request_user.first_name,
            "lastName" => request_user.last_name,
            "imageUrl" => request_user.image_url,
          }

          allow(Clerk::SDK).to receive(:new).and_return(clerk_sdk_instance)
          allow(clerk_sdk_instance).to receive_messages(verify_token: session, decode_token: (session))
        end


        schema "$ref" => "#/components/schemas/UserMe"

        OpenApi::Response.set_example_response_metadata

        run_test!
      end

      response(401, NOT_FOUND) do
        let(:request_user) { build(:user) }
        let(:Authorization) { "Bearer mock_session_token_totally_random" }

        before do
          clerk_sdk_instance = instance_double(Clerk::SDK)
          session = {
            "userId" => request_user.clerk_users.first&.clerk_user_id,
            "email" => request_user.email,
            "username" => request_user.username,
            "firstName" => request_user.first_name,
            "lastName" => request_user.last_name,
            "imageUrl" => request_user.image_url,
          }

          allow(Clerk::SDK).to receive(:new).and_return(clerk_sdk_instance)
          allow(clerk_sdk_instance).to receive_messages(verify_token: session, decode_token: (session))
        end


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
        let(:request_user) { create(:admin, :with_clerk_user) }
        let(:Authorization) { "Bearer mock_session_token_totally_random" }
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

        before do
          clerk_sdk_instance = instance_double(Clerk::SDK)
          session = {
            "userId" => request_user.clerk_users.first&.clerk_user_id,
            "email" => request_user.email,
            "username" => request_user.username,
            "firstName" => request_user.first_name,
            "lastName" => request_user.last_name,
            "imageUrl" => request_user.image_url,
          }

          allow(Clerk::SDK).to receive(:new).and_return(clerk_sdk_instance)
          allow(clerk_sdk_instance).to receive_messages(verify_token: session, decode_token: (session))
        end




        schema "$ref" => USER_DETAILS_SCHEMA_COMPONENT

        OpenApi::Response.set_example_response_metadata

        run_test!
      end

      response(404, NOT_FOUND) do
        let(:request_user) { create(:admin, :with_clerk_user) }
        let(:Authorization) { "Bearer mock_session_token_totally_random" }
        let(:id) { "invalid" }
        let(:user) do
          {
            first_name: "Updated", last_name: "Userrrrr"
          }
        end

        before do
          clerk_sdk_instance = instance_double(Clerk::SDK)
          session = {
            "userId" => request_user.clerk_users.first&.clerk_user_id,
            "email" => request_user.email,
            "username" => request_user.username,
            "firstName" => request_user.first_name,
            "lastName" => request_user.last_name,
            "imageUrl" => request_user.image_url,
          }

          allow(Clerk::SDK).to receive(:new).and_return(clerk_sdk_instance)
          allow(clerk_sdk_instance).to receive_messages(verify_token: session, decode_token: (session))
        end


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
        let(:request_user) { create(:admin, :with_clerk_user) }
        let(:Authorization) { "Bearer mock_session_token_totally_random" }
        let(:user) { create(:user) }
        let(:id) { user.id }

        before do
          clerk_sdk_instance = instance_double(Clerk::SDK)
          session = {
            "userId" => request_user.clerk_users.first&.clerk_user_id,
            "email" => request_user.email,
            "username" => request_user.username,
            "firstName" => request_user.first_name,
            "lastName" => request_user.last_name,
            "imageUrl" => request_user.image_url,
          }

          allow(Clerk::SDK).to receive(:new).and_return(clerk_sdk_instance)
          allow(clerk_sdk_instance).to receive_messages(verify_token: session, decode_token: (session))
        end


        OpenApi::Response.set_example_response_metadata

        run_test!
      end

      response(404, NOT_FOUND) do
        let(:request_user) { create(:admin, :with_clerk_user) }
        let(:Authorization) { "Bearer mock_session_token_totally_random" }
        let(:id) { "invalid" }

        before do
          clerk_sdk_instance = instance_double(Clerk::SDK)
          session = {
            "userId" => request_user.clerk_users.first&.clerk_user_id,
            "email" => request_user.email,
            "username" => request_user.username,
            "firstName" => request_user.first_name,
            "lastName" => request_user.last_name,
            "imageUrl" => request_user.image_url,
          }

          allow(Clerk::SDK).to receive(:new).and_return(clerk_sdk_instance)
          allow(clerk_sdk_instance).to receive_messages(verify_token: session, decode_token: (session))
        end


        OpenApi::Response.set_example_response_metadata

        run_test!
      end
    end
  end
end


# before do
#   clerk_sdk_instance = instance_double("Clerk::SDK")
#   allow(Clerk::SDK).to receive(:new).and_return(clerk_sdk_instance)
#   allow(clerk_sdk_instance).to receive(:verify_token).and_return({
#     "userId" => "123",
#   }) # Mock specific methods as needed
# end
