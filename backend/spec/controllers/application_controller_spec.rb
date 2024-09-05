require "rails_helper"

# Define the DummyController for testing purposes
class DummyController < ApplicationController
  def index
    authorize self.class, :index?
    head :ok
  end
end

RSpec.describe ApplicationController do
  controller(DummyController) do
    def self.policy_class
      ApplicationPolicy
    end

    def index
      authorize self.class, :index?
      head :ok
    end
  end

  describe "#authenticate_user" do
    let(:bearer_token) { AuthorizationHeader.bearer_token(user: create(:user)) }

    before do
      request.headers["Authorization"] = bearer_token
    end

    it "authenticates the user" do
      get :index
      expect(response).to have_http_status(:success)
    end

    it "handles invalid or expired session" do
      request.headers["Authorization"] = "Bearer invalid_token"
      get :index
      expect(response).to have_http_status(:unauthorized)
    end
  end
end
