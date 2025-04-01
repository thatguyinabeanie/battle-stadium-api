require "rails_helper"
require "support/auth/token_verifier_mock"

RSpec.describe Api::V1::MatchesController do
  include Auth::TokenVerifier::Mock
  include_context "with Controller Specs - Clerk JWT + Vercel OIDC Token Verification"

  let(:tournament) { create(:tournament, :with_phases, :with_players_with_team_and_checked_in) }
  let(:phase) { tournament.phases.first }
  let(:round) { phase.rounds.first }
  let(:phase_id) { phase.id }
  let(:round_id) { phase.current_round.id }
  let(:match) { create(:match, phase:, round:) }
  let(:valid_attributes) { attributes_for(:match).merge(tournament_id: tournament.id) }
  let(:invalid_attributes) { { player1_id: nil } }

  before do
    tournament.start!
  end

  describe "GET #index" do
    it "returns a success response" do
      get :index, params: { tournament_id: tournament.id }
      expect(response).to be_successful
    end
  end

  describe "GET #show" do
    it "returns a success response" do
      get :show, params: { tournament_id: tournament.id, id: match.id }
      expect(response).to be_successful
    end
  end

  xdescribe "POST #create" do # rubocop:disable RSpec/PendingWithoutReason
    let(:request_account) { tournament.organization.owner }

    context "with valid params" do

      let(:params) { { tournament_id: tournament.id, match: valid_attributes, phase_id: , round_id: } }

      it "creates a new Match" do
        before_count = Match.count
        post(:create, params:)
        after_count = Match.count
        expect(after_count).to eq(before_count + 1)
      end

      it "renders a JSON response with the new match" do
        post(:create, params:)
        expect(response.body).to eq Match.last.to_json
        expect(response).to have_http_status(:created)
        expect(response.content_type).to eq("application/json; charset=utf-8")
      end
    end

    context "with invalid params" do
      it "renders a JSON response with errors for the new match" do
        post :create, params: { tournament_id: tournament.id, match: invalid_attributes }
        expect(response).to have_http_status(:unprocessable_entity)
        expect(response.content_type).to eq("application/json; charset=utf-8")
      end
    end
  end

  describe "PUT #update" do
    let(:request_account) { tournament.organization.owner }

    context "with valid params" do
      let(:new_attributes) { { table_number: 2 } }

      it "updates the requested match" do
        patch :update, params: { tournament_id: tournament.id, id: match.id, match: new_attributes }
        match.reload
        expect(match.table_number).to eq(2)
      end

      it "renders a JSON response with the match" do
        patch :update, params: { tournament_id: tournament.id, id: match.id, match: valid_attributes }
        expect(response).to have_http_status(:ok)
        expect(response.content_type).to eq("application/json; charset=utf-8")
      end
    end

    context "with invalid params" do
      it "renders a JSON response with errors for the match" do
        patch :update, params: { tournament_id: tournament.id, id: match.id, match: { round_id: -1 } }
        expect(response).to have_http_status(:unprocessable_entity)
        expect(response.content_type).to eq("application/json; charset=utf-8")
      end
    end
  end

  xdescribe "DELETE #destroy" do # rubocop:disable RSpec/PendingWithoutReason
    it "destroys the requested match" do
      match = create(:match)
      expect {
        delete :destroy, params: { tournament_id: tournament.id, id: match.id }
      }.to change(Match, :count).by(-1)
    end

    it "renders a JSON response with the match" do
      delete :destroy, params: { tournament_id: tournament.id, id: match.id }
      expect(response).to have_http_status(:ok)
      expect(response.content_type).to eq("application/json; charset=utf-8")
    end
  end
end
