require "rails_helper"
require_relative "../../../../app/serializers/user_serializer"
require_relative "../../../../lib/json_web_token"

RSpec.describe Api::V1::UsersController do

  def json_response
    JSON.parse(response.body, symbolize_names: true)
  end

  context "when /users" do
    describe "GET" do
      it "returns a successful response" do
        create_list(:user, 3)

        get :index

        expect(response).to be_successful
      end

      it "returns a list of users" do
        create_list(:user, 3)

        get :index

        expect(json_response.size).to eq(3)
      end
    end

    describe "POST" do
      let(:user) { create(:admin) }

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

  context "when /users/:id" do
    let(:request_user) { create(:admin) }
    let(:user) { create(:user) }

    describe "GET /users/:id" do
      let(:request_user) { create(:user) }

      it "returns a successful response" do
        user = create(:user)
        get :show, params: { id: user.id }

        expect(response).to be_successful
      end

      it "returns the user" do
        user = create(:user)

        get :show, params: { id: user.id }

        expect(json_response[:id]).to eq(user.id)
      end
    end

    describe "PUT" do
      it "returns a successful response" do
        user = create(:user)
        user_attributes = attributes_for(:user)

        put :update, params: { id: user.id, user: user_attributes }

        expect(response).to be_successful
      end

      it "updates the user" do
        user = create(:user)

        put :update, params: { id: user.id, user: { first_name: "Jane" } }

        expect(json_response[:first_name]).to eq("Jane")
      end
    end

    describe "PATCH" do
      it "returns a successful response" do
        user = create(:user)

        patch :update, params: { id: user.id, user: { first_name: "Jane" } }

        expect(response).to be_successful
      end

      it "updates the user" do
        user = create(:user)

        patch :update, params: { id: user.id, user: { first_name: "Jane" } }

        expect(json_response[:first_name]).to eq("Jane")
      end
    end

    describe "DELETE" do
      let(:admin) { create(:admin) }

      it "returns a successful response" do
        user = create(:user)

        delete :destroy, params: { id: user.id }

        expect(response).to be_successful
      end

      it "deletes the user" do
        user = create(:user)

        delete :destroy, params: { id: user.id }

        expect(User.find_by(id: user.id)).to be_nil
      end
    end
  end

  # context "when /users/me" do
  #   let!(:user) { create(:user) }

  #   describe "GET" do
  #     it "returns a successful response" do
  #       get :me
  #       expect(response).to be_successful
  #     end

  #     it "returns a users me serialized response" do
  #       get :me

  #       expect(JSON.parse(response.body, symbolize_names: true)).to eq Serializers::UserMe.new(user).as_json
  #     end
  #   end
  # end
end
