require 'rails_helper'
require 'swagger_helper'
require_relative '../../../support/openapi/schema_helper'
require_relative '../../../support/openapi/response_helper'
require_relative '../../../../app/models/concerns/secure_password'
require_relative '../../../../lib/json_web_token'

USER_DETAILS_SCHEMA_COMPONENT = '#/components/schemas/UserDetails'.freeze
PASSWORD = SecurePassword.generate_secure_password

RSpec.describe Api::V1::UsersController do
  include Devise::Test::IntegrationHelpers

  path('/api/v1/users') do
    get('List Users') do
      tags 'Users'
      produces OpenApi::Response::JSON_CONTENT_TYPE
      description 'Retrieves a list of all Users'
      operationId 'listUsers'

      response(200, 'successful') do
        let(:users) { create_list(:user, 10) }

        schema type: :array, items: { '$ref' => '#/components/schemas/User' }

        OpenApi::Response.set_example_response_metadata

        run_test!
      end
    end

    post('Create User') do
      tags 'Users'
      produces OpenApi::Response::JSON_CONTENT_TYPE
      consumes OpenApi::Response::JSON_CONTENT_TYPE
      description 'Creates a new User.'
      operationId 'postUser'

      parameter name: :user, in: :body, schema: { '$ref' => '#/components/schemas/UserPostRequest' }

      security [Bearer: []]

      response(201, 'created') do
        let(:Authorization) do # rubocop:disable RSpec/VariableName
          session = create(:session, user: create(:admin))

          jwt = JsonWebToken.encrypt(
            {
              session: {
                sessionToken: session.token,
                user: {
                  id: session.user.id,
                  email: session.user.email,
                  firstName: session.user.first_name,
                  lastName: session.user.last_name,
                  pronouns: session.user.pronouns,
                  emailVerified: session.user.email_verified_at
                }
              }
            }
          )

          "Bearer #{jwt}"
        end

        let(:user) do
          {
            user: {
              username: Faker::Internet.unique.username,
              pronouns: 'he/him',
              email: 'new_user@example.com',
              first_name: 'New ',
              last_name: 'User',
              password: PASSWORD,
              password_confirmation: PASSWORD
            }
          }
        end

        schema '$ref' => USER_DETAILS_SCHEMA_COMPONENT

        OpenApi::Response.set_example_response_metadata

        run_test!
      end

      response(403, 'forbidden') do
        let(:Authorization) do # rubocop:disable RSpec/VariableName
          session = create(:session, user: create(:user))

          jwt = JsonWebToken.encrypt(
            {
              session: {
                sessionToken: session.token,
                user: {
                  id: session.user.id,
                  email: session.user.email,
                  firstName: session.user.first_name,
                  lastName: session.user.last_name,
                  pronouns: session.user.pronouns,
                  emailVerified: session.user.email_verified_at
                }
              }
            }
          )

          "Bearer #{jwt}"
        end

        let(:user) { {} }

        schema type: :object, properties: { error: { type: :string } }

        OpenApi::Response.set_example_response_metadata

        run_test!
      end

      response(422, 'unprocessable entity') do
        let(:Authorization) do # rubocop:disable RSpec/VariableName
          session = create(:session, user: create(:admin))

          jwt = JsonWebToken.encrypt(
            {
              session: {
                sessionToken: session.token,
                user: {
                  id: session.user.id,
                  email: session.user.email,
                  firstName: session.user.first_name,
                  lastName: session.user.last_name,
                  pronouns: session.user.pronouns,
                  emailVerified: session.user.email_verified_at
                }
              }
            }
          )

          "Bearer #{jwt}"
        end

        let(:user) do
          {
            user: {
              username: '',
              pronouns: 'he/him',
              email: 'new_user@example.com',
              first_name: 'New ',
              last_name: 'User',
              password: PASSWORD,
              password_confirmation: PASSWORD
            }
          }
        end

        OpenApi::Response.set_example_response_metadata

        run_test!
      end
    end
  end

  path('/api/v1/users/authorize') do
    post('Authorize User') do
      tags 'Users'
      produces OpenApi::Response::JSON_CONTENT_TYPE
      consumes OpenApi::Response::JSON_CONTENT_TYPE
      description 'Authorizes a User.'
      operationId 'authorizeUser'

      parameter name: :login, in: :body, schema: { '$ref' => '#/components/schemas/UserLoginRequest' }

      response(200, 'Successful Email Login') do
        let(:user) { create(:user, password: PASSWORD) }
        let(:login) do
          {
            email: user.email,
            password: PASSWORD
          }
        end

        schema '$ref' => '#/components/schemas/UserLoginResponse'

        OpenApi::Response.set_example_response_metadata

        run_test!
      end

      response(200, 'Successful Username Login') do
        let(:user) { create(:user, password: PASSWORD) }
        let(:login) do
          {
            username: user.username,
            password: PASSWORD
          }
        end

        schema '$ref' => '#/components/schemas/UserLoginResponse'

        OpenApi::Response.set_example_response_metadata

        run_test!
      end

      response(401, 'unauthorized') do
        let(:login) do
          {
            email: 'user.email@email.com',
            password: 'invalid'
          }
        end

        OpenApi::Response.set_example_response_metadata

        run_test!
      end
    end
  end

  path('/api/v1/users/me') do
    get('Show Me') do
      tags 'Users'
      produces OpenApi::Response::JSON_CONTENT_TYPE
      description 'Retrieves the current User.'
      operationId 'getMe'

      security [Bearer: []]

      response(200, 'successful') do
        let(:user) { create(:user) }
        let(:session) { create(:session, user:) }
        let(:jwt_token) do
          JsonWebToken.encrypt({
                                 session: {
                                   sessionToken: session.token,
                                   user: {
                                     id: session.user.id,
                                     email: session.user.email,
                                     firstName: session.user.first_name,
                                     lastName: session.user.last_name,
                                     pronouns: session.user.pronouns,
                                     emailVerified: session.user.email_verified_at
                                   }
                                 }
                               })
        end

        let(:Authorization) { "Bearer #{jwt_token}" } # rubocop:disable RSpec/VariableName

        schema '$ref' => '#/components/schemas/UserMe'

        OpenApi::Response.set_example_response_metadata

        run_test!
      end

      response(401, NOT_FOUND) do
        let(:token) { 'invalid' }
        let(:Authorization) { "Bearer #{token}" } # rubocop:disable RSpec/VariableName

        OpenApi::Response.set_example_response_metadata

        run_test!
      end
    end
  end

  path('/api/v1/users/{id}') do
    parameter name: :id, in: :path, type: :string, description: 'ID of the User'

    get('Show User') do
      tags 'Users'
      produces OpenApi::Response::JSON_CONTENT_TYPE
      description 'Retrieves a specific User by ID.'
      operationId 'getUser'

      response(200, 'successful') do
        let(:id) { create(:user, first_name: 'Existing', last_name: 'User').id }

        schema '$ref' => USER_DETAILS_SCHEMA_COMPONENT

        run_test!
      end

      response(404, NOT_FOUND) do
        let(:id) { 'invalid' }

        OpenApi::Response.set_example_response_metadata

        run_test!
      end
    end

    patch('Update User') do
      tags 'Users'
      produces OpenApi::Response::JSON_CONTENT_TYPE
      consumes OpenApi::Response::JSON_CONTENT_TYPE
      description 'Updates an existing User.'
      operationId 'patchUser'

      parameter name: :user, in: :body, schema: { '$ref' => '#/components/schemas/UserDetails' }

      security [Bearer: []]

      response(200, 'Updated by Admin') do
        let(:user_object) { create(:user) }
        let(:id) { user_object.id }
        let(:user) do
          {
            username: Faker::Internet.unique.username,
            pronouns: 'they/them',
            email: 'updateduser@example.com',
            first_name: 'Updated', last_name: 'Userrrrr',
            current_password: user_object.password
          }
        end

        let(:Authorization) do # rubocop:disable RSpec/VariableName
          session = create(:session, user: create(:admin))
          jwt_token = JsonWebToken.encrypt(
            {
              session: {
                sessionToken: session.token,
                user: {
                  id: session.user.id,
                  email: session.user.email,
                  firstName: session.user.first_name,
                  lastName: session.user.last_name,
                  pronouns: session.user.pronouns,
                  emailVerified: session.user.email_verified_at
                }
              }
            }
          )
          "Bearer #{jwt_token}"
        end

        schema '$ref' => USER_DETAILS_SCHEMA_COMPONENT

        OpenApi::Response.set_example_response_metadata

        run_test!
      end

      response(404, NOT_FOUND) do
        let(:Authorization) do # rubocop:disable RSpec/VariableName
          session = create(:session, user: create(:admin))
          jwt_token = JsonWebToken.encrypt(
            {
              session: {
                sessionToken: session.token,
                user: {
                  id: session.user.id,
                  email: session.user.email,
                  firstName: session.user.first_name,
                  lastName: session.user.last_name,
                  pronouns: session.user.pronouns,
                  emailVerified: session.user.email_verified_at
                }
              }
            }
          )
          "Bearer #{jwt_token}"
        end
        let(:id) { 'invalid' }
        let(:user) do
          {
            first_name: 'Updated', last_name: 'Userrrrr'
          }
        end

        OpenApi::Response.set_example_response_metadata

        run_test!
      end
    end

    delete('Delete User') do
      tags 'Users'
      produces OpenApi::Response::JSON_CONTENT_TYPE
      describe 'Deletes a User by ID.'
      operationId 'deleteUser'

      security [Bearer: []]

      response(200, 'successful') do
        let(:Authorization) do # rubocop:disable RSpec/VariableName
          session = create(:session, user: create(:admin))
          jwt_token = JsonWebToken.encrypt(
            {
              session: {
                sessionToken: session.token,
                user: {
                  id: session.user.id,
                  email: session.user.email,
                  firstName: session.user.first_name,
                  lastName: session.user.last_name,
                  pronouns: session.user.pronouns,
                  emailVerified: session.user.email_verified_at
                }
              }
            }
          )
          "Bearer #{jwt_token}"
        end

        let(:user) { create(:user) }
        let(:id) { user.id }

        OpenApi::Response.set_example_response_metadata

        run_test!
      end

      response(404, NOT_FOUND) do
        let(:Authorization) do # rubocop:disable RSpec/VariableName
          session = create(:session, user: create(:admin))
          jwt_token = JsonWebToken.encrypt(
            {
              session: {
                sessionToken: session.token,
                user: {
                  id: session.user.id,
                  email: session.user.email,
                  firstName: session.user.first_name,
                  lastName: session.user.last_name,
                  pronouns: session.user.pronouns,
                  emailVerified: session.user.email_verified_at
                }
              }
            }
          )
          "Bearer #{jwt_token}"
        end
        let(:id) { 'invalid' }

        OpenApi::Response.set_example_response_metadata

        run_test!
      end
    end
  end
end
