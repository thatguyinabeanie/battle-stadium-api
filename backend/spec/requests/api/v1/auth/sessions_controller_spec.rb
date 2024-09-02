require 'swagger_helper'
require_relative '../../../../support/openapi/response_helper'

RSpec.describe Api::V1::Auth::SessionsController do
  path('/api/v1/auth/session') do
    get('Get') do
      tags 'Sessions'
      produces 'application/json'
      description 'Shows the current session.'
      operationId 'getSession'

      security [Bearer: []]

      response(200, 'ok') do
        let(:existing_user) { create(:user) }
        let(:session) { create(:session, user: existing_user) }
        let(:Authorization) { "Bearer #{session.encrypted_jwt}" } # rubocop:disable RSpec/VariableName

        schema '$ref' => '#/components/schemas/SessionAndUser'
        OpenApi::Response.set_example_response_metadata

        run_test!
      end

      response(401, 'unauthorized') do
        let(:Authorization) { 'Bearer invalid' } # rubocop:disable RSpec/VariableName

        OpenApi::Response.set_example_response_metadata

        run_test!
      end
    end

    post('Create') do
      tags 'Sessions'
      produces 'application/json'
      consumes 'application/json'
      description 'Logs in a User.'
      operationId 'loginUser'

      parameter name: :create_session_params, in: :body, schema: { '$ref' => '#/components/schemas/CreateSession' }

      response(201, 'Created') do
        let(:existing_user) { create(:user) }
        let(:create_session_params) do
          {
            user_id: existing_user.id,
          }
        end

        schema '$ref' => '#/components/schemas/UserLoginResponse'
        OpenApi::Response.set_example_response_metadata

        run_test!
      end

      response(401, 'Unauthorized with Email') do
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

      response(401, 'Unauthorized with no email or password.') do
        let(:user) do
          {
            user: {
              password: SecurePassword.generate_secure_password
            }
          }
        end

        OpenApi::Response.set_example_response_metadata

        run_test!
      end
    end

    delete('Delete') do
      tags 'Sessions'
      produces 'application/json'
      description 'Logs out a User.'
      operationId 'logoutUser'

      response(204, 'no content') do
        let(:existing_user) { create(:user) }
        let(:session) { create(:session, user: existing_user) }
        let(:Authorization) { "Bearer #{session.encrypted_jwt}" } # rubocop:disable RSpec/VariableName

        OpenApi::Response.set_example_response_metadata

        run_test!
      end
    end

    put('Update') do
      tags 'Sessions'
      produces 'application/json'
      description 'Updates the current session.'
      operationId 'update'

      security [Bearer: []]

      response(200, 'updates') do
        let(:existing_user) { create(:user) }
        let(:session) { create(:session, user: existing_user) }
        let(:Authorization) { "Bearer #{session.encrypted_jwt}" } # rubocop:disable RSpec/VariableName

        schema '$ref' => '#/components/schemas/SessionAndUser'
        OpenApi::Response.set_example_response_metadata

        run_test!
      end

      response(401, 'unauthorized') do
        let(:Authorization) { 'Bearer invalid' } # rubocop:disable RSpec/VariableName

        OpenApi::Response.set_example_response_metadata

        run_test!
      end
    end
  end
end
