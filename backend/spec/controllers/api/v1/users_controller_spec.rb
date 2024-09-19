require "rails_helper"
require_relative "../../../../app/serializers/user_serializer"
require_relative "../../../support/auth/clerk/token_verifier_mock"

RSpec.describe Api::V1::UsersController do
  include Clerk::TokenVerifier::Mock

  def json_response
    JSON.parse(response.body, symbolize_names: true)
  end

  before do
    request.headers["Authorization"] =  "Bearer #{SecureRandom.alphanumeric(25)}"
  end

  context "when /users" do
    describe "GET" do
      it "returns a list of users" do
        create_list(:user, 3)

        get :index

        expect(json_response.size).to eq(3)
      end
    end

    describe "POST" do
      let(:request_user) { create(:admin) }

      include_context "with Clerk SDK Mock"

      it "returns a successful response" do
        post :create, params: { user: attributes_for(:user) }

        expect(response).to be_successful
      end

      it "creates a new user" do
        user_attributes = attributes_for(:user)

        post :create, params: { user: user_attributes }

        expect(json_response[:email]).to eq(user_attributes[:email])
      end
    end
  end

  context "when /users/:username" do
    let(:request_user) { create(:admin) }
    let(:user) { create(:user) }

    describe "GET /users/:username" do
      let(:request_user) { create(:user) }

      it "returns a successful response" do
        user = create(:user)
        get :show, params: { username: user.username}

        expect(response).to be_successful
      end

      it "returns the user" do
        user = create(:user)

        get :show, params: { username: user.username }

        expect(json_response[:username]).to eq(user.username)
      end
    end

    describe "PUT" do
      let(:request_user) { create(:admin) }


      include_context "with Clerk SDK Mock"

      it "returns a successful response" do
        user = create(:user)
        user_attributes = attributes_for(:user)

        put :update, params: { username: user.username, user: user_attributes }

        expect(response).to be_successful
      end

      it "updates the user" do
        user = create(:user)

        put :update, params: { username: user.username, user: { first_name: "Jane" } }

        expect(json_response[:first_name]).to eq("Jane")
      end
    end

    describe "PATCH" do
      let(:request_user) { create(:admin) }

      include_context "with Clerk SDK Mock"

      it "returns a successful response" do
        user = create(:user)

        patch :update, params: { username: user.username, user: { first_name: "Jane" } }

        expect(response).to be_successful
      end

      it "updates the user" do
        user = create(:user)

        patch :update, params: { username: user.username, user: { first_name: "Jane" } }

        expect(json_response[:first_name]).to eq("Jane")
      end
    end

    describe "DELETE" do
      let(:request_user) { create(:admin) }

      include_context "with Clerk SDK Mock"

      it "returns a successful response" do
        user = create(:user)

        delete :destroy, params: { username: user.username }

        expect(response).to be_successful
      end

      it "deletes the user" do
        user = create(:user)

        delete :destroy, params: { username: user.username }

        expect(User.find_by(username: user.username)).to be_nil
      end
    end
  end

  context "when /users/me" do
    let(:request_user) { create(:user) }

    include_context "with Clerk SDK Mock"

    describe "GET" do
      it "returns a successful response" do
        get :me
        expect(response).to be_successful
      end

      it "returns a users me serialized response" do
        get :me

        expect(JSON.parse(response.body, symbolize_names: true)).to eq Serializers::UserMe.new(request_user).as_json
      end
    end
  end
end
