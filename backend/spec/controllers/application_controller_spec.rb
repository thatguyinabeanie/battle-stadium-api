require 'rails_helper'

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

  describe '#authenticate_user' do
    let(:user) { create(:user) }
    let(:jwt_token) do
      session = create(:session, user:)
      JsonWebToken.encrypt({
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

    before do
      request.headers['Authorization'] = "Bearer #{jwt_token}"
    end

    it 'authenticates the user' do
      get :index
      expect(response).to have_http_status(:success)
    end

    it 'handles invalid or expired session' do
      request.headers['Authorization'] = 'Bearer invalid_token'
      get :index
      expect(response).to have_http_status(:unauthorized)
    end
  end
end
