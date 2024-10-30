require "rails_helper"
require_relative "../../lib/auth/clerk/session"
require_relative "../../lib/auth/vercel/token_verifier"
require "support/auth/token_verifier_mock"
RSpec.describe ApplicationController do

  include Auth::TokenVerifier::Mock

  include_context "with Controller Specs - Clerk JWT + Vercel OIDC Token Verification"

  controller(described_class) do
    def index
      authorize :application, :index?
      head :ok
    end

    def show
      authorize :application, :show?
      head :ok
    end
  end

  describe "GET #index" do
    let(:account) { create(:account) }

    context "with valid session and oidc token" do
      before do
        allow(Auth::Clerk::Session).to receive(:authenticate!).and_return(account)
        allow(Auth::Vercel::TokenVerifier).to receive(:verify).and_return(true)
      end

      it "returns http success" do
        get :index
        expect(response).to have_http_status(:success)
      end
    end

    context "with invalid session" do
      before do
        allow(Auth::Clerk::Session).to receive(:authenticate!).and_raise(StandardError.new("Invalid session"))
      end

      it "returns http ok" do
        get :index
        expect(response).to have_http_status(:ok)
      end
    end

    context "with invalid OIDC token" do
      before do
        allow(Auth::Vercel::TokenVerifier).to receive(:verify).and_return(false)
      end

      it "returns http unauthorized" do
        get :index
        expect(response).to have_http_status(:unauthorized)
      end
    end
  end

  describe "GET #show" do
    context "with valid session and OIDC token" do
      before do
        allow(Auth::Clerk::Session).to receive(:authenticate!).and_return(:account)
        allow(Auth::Vercel::TokenVerifier).to receive(:verify).and_return(true)
      end

      it "returns http success" do
        get :show, params: { id: 1 }
        expect(response).to have_http_status(:success)
      end
    end

    context "with invalid session" do
      before do
        allow(Auth::Clerk::Session).to receive(:authenticate!).and_raise(StandardError.new("Invalid session"))
      end

      it "returns http ok" do
        get :show, params: { id: 1 }
        expect(response).to have_http_status(:ok)
      end
    end

    context "with invalid OIDC token" do
      before do
        allow(Auth::Vercel::TokenVerifier).to receive(:verify).and_return(false)
      end

      it "returns http unauthorized" do
        get :show, params: { id: 1 }
        expect(response).to have_http_status(:unauthorized)
      end
    end
  end
end
