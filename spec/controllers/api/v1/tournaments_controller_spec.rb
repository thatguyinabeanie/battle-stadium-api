require "rails_helper"
require "support/auth/token_verifier_mock"

RSpec.describe Api::V1::TournamentsController do
  include Auth::TokenVerifier::Mock

  include_context "with Controller Specs - Clerk JWT + Vercel OIDC Token Verification"

  describe "GET #index" do

    it "returns a successful response" do
      get :index
      expect(response).to have_http_status(:ok)
    end

    it "returns a list of tournaments" do
      create_list(:tournament, 3)
      get :index
      json_response = response.parsed_body
      expect(json_response["data"].size).to eq(3)
    end

    it "does not return unpublished tournaments" do
      create(:tournament, published: false)
      get :index
      json_response = response.parsed_body
      expect(json_response["data"].size).to eq(0)
    end
  end

  describe "GET #show" do
    let(:tournament) { create(:tournament) }

    context("when the account is authorized") do
      let(:request_account) { tournament.organization.owner }

      it "returns a successful response" do
        get :show, params: { id: tournament.id }
        expect(response).to have_http_status(:ok)
      end

      it "returns the tournament details" do
        get :show, params: { id: tournament.id }
        json_response = response.parsed_body
        expect(json_response["id"]).to eq(tournament.id)
      end

      it "returns the unpublished tournament" do
        tournament.update!(published: false)
        get :show, params: { id: tournament.id }
        expect(response).to have_http_status(:ok)
      end
    end

    context("when the account is not authorized") do

      it "returns the published tournament" do
        get :show, params: { id: tournament.id }
        expect(response).to have_http_status(:ok)
      end

      it "returns unauthorized if the tournament is not published" do
        tournament.update!(published: false)
        get :show, params: { id: tournament.id }
        expect(response).to have_http_status(:unauthorized)
      end
    end
  end

  describe "POST #create" do
    let(:organization) { create(:organization) }
    let(:organization_id) { organization.id }
    let(:request_account) { organization.owner }
    let(:game) { create(:game) }
    let(:game_id) { game.id }
    let(:format) { create(:format, game:) }
    let(:format_id) { format.id }

    let(:valid_attributes) { attributes_for(:tournament, organization_id:, game_id:, format_id:) }

    context "with valid attributes" do
      it "creates a new tournament" do
        count_before = Tournament.count
        post :create, params: { tournament: valid_attributes }
        count_after = Tournament.count
        expect(count_after).to eq(count_before + 1)
      end

      it "returns a created status" do
        post :create, params: { tournament: valid_attributes }
        expect(response).to have_http_status(:created)
      end
    end

    context "with invalid attributes" do
      it "does not create a new tournament" do
        expect {
          post :create, params: { tournament: { name: nil } }
        }.not_to change(Tournament, :count)
      end

      it "returns an unprocessable entity status" do
        post :create, params: { tournament: { name: nil } }
        expect(response).to have_http_status(:not_found)
      end
    end
  end

  describe "PUT #update" do
    let(:tournament) { create(:tournament) }
    let(:new_attributes) { { name: "Updated Tournament Name" } }
    let(:request_account) { tournament.organization.owner }

    context "with valid attributes" do
      it "updates the tournament" do
        put :update, params: { id: tournament.id, tournament: new_attributes }
        tournament.reload
        expect(tournament.name).to eq("Updated Tournament Name")
      end

      it "returns a successful response" do
        put :update, params: { id: tournament.id, tournament: new_attributes }
        expect(response).to have_http_status(:ok)
      end
    end

    context "with invalid attributes" do
      it "does not update the tournament" do
        put :update, params: { id: tournament.id, tournament: { name: nil } }
        tournament.reload
        expect(tournament.name).not_to be_nil
      end

      it "returns an unprocessable entity status" do
        put :update, params: { id: tournament.id, tournament: { name: nil } }
        expect(response).to have_http_status(:unprocessable_entity)
      end
    end
  end

  describe "DELETE #destroy" do
    let!(:tournament) { create(:tournament) }
    let(:request_account) { tournament.organization.owner }

    it "deletes the tournament" do
      expect {
        delete :destroy, params: { id: tournament.id }
      }.to change(Tournament, :count).by(-1)
    end

    it "returns a successful response" do
      delete :destroy, params: { id: tournament.id }
      expect(response).to have_http_status(:ok)
    end
  end

  describe "POST #start" do
    let(:tournament) { create(:tournament, :with_phases, :with_players_with_team_and_checked_in) }
    let(:request_account) { tournament.organization.owner }

    context "when the tournament is not ready to start" do
      let(:tournament) { create(:tournament, :with_phases) }

      it "returns an unprocessable entity status" do
        post :start_tournament, params: { id: tournament.id }
        expect(response).to have_http_status(:unprocessable_entity)
      end
    end

    context "when the tournament is ready to start" do
      it "starts the tournament" do
        post :start_tournament, params: { id: tournament.id }
        tournament.reload
        expect(tournament.started_at).not_to be_nil
      end

      it "accepts players into the first phase" do
        post :start_tournament, params: { id: tournament.id }
        tournament.reload
        expect(tournament.phases.first.players.count).to eq(5)
      end

      it "starts the first round of the first phase" do
        post :start_tournament, params: { id: tournament.id }
        tournament.reload
        expect(tournament.phases.first.rounds.count).to eq(1)
      end
    end
  end
end
