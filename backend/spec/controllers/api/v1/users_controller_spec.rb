require 'rails_helper'
require_relative '../../../../app/serializer/user_serializer'

RSpec.describe Api::V1::UsersController do
  include Devise::Test::ControllerHelpers

  def json_response
    JSON.parse(response.body, symbolize_names: true)
  end

  context 'when /users' do
    describe 'GET' do
      it 'returns a successful response' do
        create_list(:user, 3)

        get :index

        expect(response).to be_successful
      end

      it 'returns a list of users' do
        create_list(:user, 3)

        get :index

        expect(json_response.size).to eq(3)
      end
    end

    describe 'POST' do
      it 'returns a successful response' do
        post :create, params: { user: attributes_for(:user) }

        expect(response).to be_successful
      end

      it 'creates a new user' do
        user_attributes = attributes_for(:user)

        post :create, params: { user: user_attributes }

        expect(json_response[:email]).to eq(user_attributes[:email])
      end
    end
  end

  context 'when /users/:id' do
    describe 'GET /users/:id' do
      it 'returns a successful response' do
        user = create(:user)

        get :show, params: { id: user.id }

        expect(response).to be_successful
      end

      it 'returns the user' do
        user = create(:user)

        get :show, params: { id: user.id }

        expect(json_response[:id]).to eq(user.id)
      end
    end

    describe 'PUT' do
      it 'returns a successful response' do
        user = create(:user)
        user_attributes = attributes_for(:user)

        put :update, params: { id: user.id, user: user_attributes }

        expect(response).to be_successful
      end

      it 'updates the user' do
        user = create(:user)

        put :update, params: { id: user.id, user: { first_name: 'Jane' } }

        expect(json_response[:first_name]).to eq('Jane')
      end
    end

    describe 'PATCH' do
      it 'returns a successful response' do
        user = create(:user)

        patch :update, params: { id: user.id, user: { first_name: 'Jane' } }

        expect(response).to be_successful
      end

      it 'updates the user' do
        user = create(:user)

        patch :update, params: { id: user.id, user: { first_name: 'Jane' } }

        expect(json_response[:first_name]).to eq('Jane')
      end
    end

    describe 'DELETE' do
      it 'returns a successful response' do
        user = create(:user)

        delete :destroy, params: { id: user.id }

        expect(response).to be_successful
      end

      it 'deletes the user' do
        user = create(:user)

        delete :destroy, params: { id: user.id }

        expect(User.find_by(id: user.id)).to be_nil
      end
    end
  end

  context 'when /users/:id/password' do
    describe 'PATCH' do
      it 'returns a successful response' do
        user = create(:user)
        password = SecurePassword.generate_secure_password

        patch :patch_password, params: { id: user.id, user: { password:, password_confirmation: password, current_password: user.password } }
        expect(json_response[:message]).to eq('Password updated successfully')
      end

      it 'changes the password successfully' do
        user = create(:user)
        password = SecurePassword.generate_secure_password
        patch :patch_password, params: { id: user.id, user: { password:, password_confirmation: password, current_password: user.password } }
        expect(user.password).not_to eq(password)
      end

      it 'returns an error if the current password is incorrect' do
        user = create(:user)
        password = SecurePassword.generate_secure_password
        # deepcode ignore HardcodedPassword: not a real password. just a string in a test
        patch :patch_password, params: { id: user.id, user: { password:, password_confirmation: password, current_password: 'incorrect_password' } }
        expect(json_response[:errors]).to include('Current password is invalid')
      end

      it 'returns an error if the password and password confirmation do not match' do
        user = create(:user)
        password = SecurePassword.generate_secure_password
        # deepcode ignore HardcodedPassword: not a real password. just a string in a test
        patch :patch_password, params: { id: user.id, user: { password:, password_confirmation: 'incorrect_password', current_password: user.password } }
        expect(json_response[:errors]).to include("Password confirmation doesn't match Password")
      end

      it 'returns an error if the password is too short' do
        user = create(:user)
        password = 'short'
        patch :patch_password, params: { id: user.id, user: { password:, password_confirmation: password, current_password: user.password } }
        expect(json_response[:errors]).to include('Password is too short (minimum is 6 characters)')
      end

      it 'returns an error if the password is too long' do
        user = create(:user)

        password = 'a' * 129

        patch :patch_password, params: { id: user.id, user: { password:, password_confirmation: password, current_password: user.password } }

        expect(json_response[:errors]).to include('Password is too long (maximum is 128 characters)')
      end

      it 'returns an error if the password is blank' do
        user = create(:user)
        patch :patch_password, params: { id: user.id, user: { password: '', password_confirmation: 'other', current_password: user.password } }
        expect(json_response[:errors]).to include("Password can't be blank")
      end
    end
  end

  context 'when /users/me' do
    let!(:user) { create(:user) }

    before do
      sign_in user
    end

    describe 'GET' do
      it 'returns a successful response' do
        get :me
        expect(response).to be_successful
      end

      it 'returns a users me serialized response' do
        get :me

        expect(JSON.parse(response.body, symbolize_names: true)).to eq Serializer::UserMe.new(user).as_json
      end
    end
  end
end
