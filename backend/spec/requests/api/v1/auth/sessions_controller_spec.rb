require 'swagger_helper'
# require_relative '../../support/openapi/schema_helper'
require_relative '../../../../support/openapi/response_helper'
# require_relative '../../../app/models/concerns/secure_password'

RSpec.describe Api::V1::Auth::SessionsController do
  path('/api/v1/auth/sign_in') do
    post('Login') do
      tags 'Sessions'
      produces 'application/json'
      consumes 'application/json'
      description 'Logs in a User.'
      operationId 'loginUser'

      parameter name: :user, in: :body, schema: { '$ref' => '#/components/schemas/UserLoginRequest' }

      response(201, 'created') do
        let(:existing_user) { create(:user) }
        let(:user) do
          {
            email: existing_user.email,
            password: existing_user.password
          }
        end

        schema '$ref' => '#/components/schemas/UserLoginResponse'
        OpenApi::Response.set_example_response_metadata

        run_test!
      end

      response(201, 'created') do
        let(:existing_user) { create(:user) }
        let(:user) do
          {
            username: existing_user.username,
            password: existing_user.password
          }
        end

        schema '$ref' => '#/components/schemas/UserLoginResponse'
        OpenApi::Response.set_example_response_metadata

        run_test!
      end

      response(401, 'unauthorized') do
        let(:user) do
          {
            user: {
              email: 'wrong@example.com',
              password: SecurePassword.generate_secure_password
            }
          }
        end

        OpenApi::Response.set_example_response_metadata

        run_test!
      end
    end
  end

  path('/api/v1/auth/sign_out') do
    delete('Logout') do
      tags 'Sessions'
      produces 'application/json'
      description 'Logs out a User.'
      operationId 'logoutUser'

      response(204, 'no content') do
        OpenApi::Response.set_example_response_metadata

        run_test!
      end
    end
  end
end
