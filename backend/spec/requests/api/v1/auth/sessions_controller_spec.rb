require 'swagger_helper'
require_relative '../../../../support/openapi/response_helper'
require_relative '../../../../../lib/token_encryptor'

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
        let(:jwt_token) do
          TokenEncryptor.encrypt({
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
      description 'Creates a new session.'
      operationId 'create'

      parameter name: :create_session_params, in: :body, schema: { '$ref' => '#/components/schemas/CreateSession' }

      response(201, 'Created') do
        let(:existing_user) { create(:user) }
        let(:create_session_params) do
          {
            user_id: existing_user.id,
            password: existing_user.password
          }
        end

        schema '$ref' => '#/components/schemas/Session'
        OpenApi::Response.set_example_response_metadata

        run_test!
      end

      response(401, 'Unauthorized with Email') do
        let(:existing_user) { create(:user) }

        let(:create_session_params) do
          {
            user_id: existing_user.id
          }
        end

        OpenApi::Response.set_example_response_metadata

        run_test!
      end

      response(401, 'Unauthorized with no email or password.') do
        let(:existing_user) { create(:user) }

        let(:create_session_params) do
          {
            user_id: existing_user.id
          }
        end

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
        let(:jwt_token) do
          TokenEncryptor.encrypt({
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

        schema '$ref' => '#/components/schemas/Session'
        OpenApi::Response.set_example_response_metadata

        run_test!
      end

      response(401, 'unauthorized') do
        let(:Authorization) { 'Bearer invalid' } # rubocop:disable RSpec/VariableName

        OpenApi::Response.set_example_response_metadata

        run_test!
      end
    end

    delete('Delete') do
      tags 'Sessions'
      produces 'application/json'
      description 'Logs out a User.'
      operationId 'logoutUser'

      security [Bearer: []]

      response(200, 'session deleted') do
        let(:existing_user) { create(:user) }
        let(:session) { create(:session, user: existing_user) }
        let(:jwt_token) do
          TokenEncryptor.encrypt({
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

        OpenApi::Response.set_example_response_metadata

        run_test!
      end
    end
  end
end
