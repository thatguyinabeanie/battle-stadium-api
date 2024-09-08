require "rails_helper"

# Define the DummyController for testing purposes
class DummyController < ApplicationController
  def index
    # authorize self.class, :index?
    head :ok
  end
end

RSpec.describe ApplicationController do
  controller(DummyController) do
    def self.policy_class
      ApplicationPolicy
    end

    def index
      # authorize self.class, :index?
      head :ok
    end
  end

  pending "#authenticate_user" do

    it "authenticates the user" do
      get :index
      expect(response).to have_http_status(:success)
    end

    it "handles invalid or expired session" do
      get :index
      expect(response).to have_http_status(:unauthorized)
    end
  end
end
