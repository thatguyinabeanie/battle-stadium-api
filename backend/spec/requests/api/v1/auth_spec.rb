require 'swagger_helper'

RSpec.describe 'Auth API', type: :request do
  path '/api/v1/auth/sign_in' do
    post 'Authenticates a user' do
      tags 'Auth'
      consumes 'application/json'
      parameter name: :auth, in: :body, schema: {
        type: :object,
        properties: {
          email: { type: :string },
          password: { type: :string }
        },
        required: %w[email password]
      }

      response '200', 'User authenticated' do
        let(:auth) { { email: 'user@example.com', password: 'password123' } }

        run_test!
      end

      response '401', 'Invalid credentials' do
        let(:auth) { { email: 'user@example.com', password: 'invalidpassword' } }

        run_test!
      end
    end
  end

  path '/api/v1/auth' do
    post 'Registers a new user' do
      tags 'Auth'
      consumes 'application/json'
      parameter name: :registration, in: :body, schema: {
        type: :object,
        properties: {
          email: { type: :string },
          password: { type: :string },
          password_confirmation: { type: :string }
        },
        required: %w[email password password_confirmation]
      }

      response '200', 'User registered' do
        let(:registration) { { email: 'user@example.com', password: 'password123', password_confirmation: 'password123' } }

        run_test!
      end

      response '422', 'Invalid registration data' do
        let(:registration) { { email: 'user@example.com', password: 'password123', password_confirmation: 'invalidpassword' } }

        run_test!
      end
    end
  end
end
