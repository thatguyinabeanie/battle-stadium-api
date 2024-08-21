# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'User Authentication' do
  let(:user) { create(:user) }
  let(:user_params) { { user: { email: user.email, password: user.password } } }
  let(:signup_params) { { user: attributes_for(:user) } }

  describe 'POST /login' do
    context 'with valid credentials' do
      it 'logging in return ok status' do
        post user_session_path, params: user_params
        expect(response).to have_http_status(:ok)
      end

      it 'logs in the user' do
        post user_session_path, params: user_params
        expect(json_response['email']).to eq(user.email)
      end
    end

    context 'with invalid credentials' do
      it 'returns unauthorized status' do
        post user_session_path, params: { user: { email: user.email, password: 'wrongpassword' } }
        expect(response).to have_http_status(:unauthorized)
      end
    end
  end

  describe 'DELETE /logout' do
    before do
      post user_session_path, params: user_params
    end

    it 'logs out the user' do
      delete destroy_user_session_path
      expect(response).to have_http_status(:no_content)
    end
  end

  describe 'POST /signup' do
    context 'with valid parameters' do
      it 'creating a new user returns http ok status' do
        post user_registration_path, params: signup_params
        expect(response).to have_http_status(:ok)
      end

      it 'creates a new user' do
        post user_registration_path, params: signup_params
        expect(json_response['email']).to eq(signup_params[:user][:email])
      end
    end

    context 'with invalid parameters' do
      it 'returns unprocessable entity status' do
        post user_registration_path, params: { user: { email: 'invalid', password: 'short' } }
        expect(response).to have_http_status(:unprocessable_entity)
      end
    end
  end
end
