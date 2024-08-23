require 'swagger_helper'
require_relative '../../../../support/openapi/response_helper'

RSpec.describe Api::V1::Auth::RegistrationsController do
  path('/api/v1/auth') do
    post 'Registers a new user' do
      tags 'Registration'
      consumes 'application/json'
      produces 'application/json'
      description 'Registers a new user'
      operationId 'registerUser'

      parameter name: :user, in: :body, schema: {
        type: :object,
        properties: {
          username: { type: :string },
          first_name: { type: :string },
          last_name: { type: :string },
          email: { type: :string, format: :email },
          password: { type: :string, format: :password },
          password_confirmation: { type: :string, format: :password }
        },
        required: %w[email password password_confirmation]
      }

      response '201', 'user created' do
        let(:password) { SecurePassword.generate_secure_password }
        let(:user) do
          { user: {
            email: 'test@example.com', password:, password_confirmation: password,
            username: 'gods_gift', first_name: 'Godwin', last_name: 'Oge'
          } }
        end

        schema '$ref' => '#/components/schemas/RegistrationResponse'

        OpenApi::Response.set_example_response_metadata

        run_test!
      end

      response '422', 'invalid request' do
        let(:user) do
          { user:
                    { email: 'test@example.com', password: 'password', password_confirmation: 'password' } }
        end

        run_test!
      end
    end
  end
end
