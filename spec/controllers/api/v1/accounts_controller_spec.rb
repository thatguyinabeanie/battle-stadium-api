require "rails_helper"
require_relative "../../../../app/serializers/account_serializer"
require_relative "../../../support/auth/token_verifier_mock"

RSpec.describe Api::V1::AccountsController do
  include Auth::TokenVerifier::Mock

  def json_response
    JSON.parse(response.body, symbolize_names: true)
  end

  include_context "with Controller Specs - Clerk JWT + Vercel OIDC Token Verification"

  context "when /accounts" do

    describe "GET" do
      it "returns a list of accounts" do
        create_list(:account, 3)

        get :index

        expect(json_response.size).to eq(4) # 3 + 1 request_account
      end
    end

    describe "POST" do
      let(:request_account) { create(:admin) }
      let(:username)  { "nick furry" }

      it "returns a successful response" do
        post :create, params: { username: , account: attributes_for(:account) }

        expect(response).to be_successful
      end

      it "creates a new account" do
        account_attributes = attributes_for(:account)

        post :create, params: { username: , account: account_attributes }

        expect(json_response[:email]).to eq(account_attributes[:email])
      end
    end
  end

  context "when /accounts/:username" do
    let(:request_account) { create(:admin) }
    let(:account) { create(:account) }

    describe "GET /accounts/:username" do
      let(:request_account) { create(:account) }

      it "returns a successful response" do
        account = create(:account)
        get :show, params: { username: account.username }

        expect(response).to be_successful
      end

      it "returns the account" do
        account = create(:account)

        get :show, params: { username: account.username }

        expect(json_response[:username]).to eq(account.username)
      end
    end

    describe "PUT" do
      let(:request_account) { create(:admin) }

      it "updates the account" do
        account = create(:account)

        put :update, params: { username: account.username, account: { first_name: "Jane" } }
        expect(response).to be_successful

        expect(json_response[:first_name]).to eq("Jane")
      end
    end

    describe "PATCH" do
      let(:request_account) { create(:admin) }
      let(:account) { create(:account) }

      it "returns a successful response" do

        patch :update, params: { username: account.username, account: { first_name: "Jane" } }

        expect(response).to be_successful
      end

      it "updates the account" do

        patch :update, params: { username: account.username, account: { first_name: "Jane" } }

        expect(json_response[:first_name]).to eq("Jane")
      end
    end

    describe "DELETE" do
      let(:request_account) { create(:admin) }

      it "returns a successful response" do

        delete :destroy, params: { username: account.username }

        expect(response).to be_successful
      end

      it "deletes the account" do

        delete :destroy, params: { username: account.username }

        expect(Account.find_by_profile_username(account.username)).to be_nil
      end
    end
  end

  context "when /accounts/me" do
    let(:request_account) { create(:account) }

    describe "GET" do
      it "returns a successful response" do
        get :me
        expect(response).to be_successful
      end

      it "returns a accounts me serialized response" do
        get :me

        expect(JSON.parse(response.body, symbolize_names: true)).to eq Serializers::AccountMe.new(request_account).as_json
      end
    end
  end
end
