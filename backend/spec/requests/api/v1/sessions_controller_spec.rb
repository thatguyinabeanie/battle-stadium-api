require 'swagger_helper'
# require_relative '../../support/openapi/schema_helper'
require 'support/openapi/response_helper'
# require_relative '../../../app/models/concerns/secure_password'

RSpec.describe Api::V1::SessionsController do
  path('/login') do
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
            user: {
              email: existing_user.email,
              password: existing_user.password
            }
          }
        end

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
end
