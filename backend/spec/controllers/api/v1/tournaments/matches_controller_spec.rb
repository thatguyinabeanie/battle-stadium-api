require "rails_helper"
require "support/auth/token_verifier_mock"

RSpec.describe Api::V1::Tournaments::MatchesController do
  pending "add some examples to (or delete) #{__FILE__} because the implementation is not complete" do # rubocop:disable RSpec/PendingWithoutReason
    include Auth::TokenVerifier::Mock

    include_context "with Controller Specs - Clerk JWT + Vercel OIDC Token Verification"

    let(:tournament) { create(:tournament) }
    let(:match) { create(:match) }
    let(:valid_attributes) { attributes_for(:match).merge(tournament_id: tournament.id) }
    let(:invalid_attributes) { { player1_id: nil } }

    before do
      allow(controller).to receive(:set_tournament).and_return(tournament)
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

    describe "POST #create" do
      context "with valid params" do
        it "creates a new Match" do
          expect {
            post :create, params: { tournament_id: tournament.id, match: valid_attributes }
          }.to change(Tournaments::Match, :count).by(1)
        end

        it "renders a JSON response with the new match" do
          post :create, params: { tournament_id: tournament.id, match: valid_attributes }
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
      context "with valid params" do
        let(:new_attributes) { { table_number: 2 } }

        it "updates the requested match" do
          put :update, params: { tournament_id: tournament.id, id: match.id, match: new_attributes }
          match.reload
          expect(match.table_number).to eq(2)
        end

        it "renders a JSON response with the match" do
          put :update, params: { tournament_id: tournament.id, id: match.id, match: valid_attributes }
          expect(response).to have_http_status(:ok)
          expect(response.content_type).to eq("application/json; charset=utf-8")
        end
      end

      context "with invalid params" do
        it "renders a JSON response with errors for the match" do
          put :update, params: { tournament_id: tournament.id, id: match.id, match: invalid_attributes }
          expect(response).to have_http_status(:unprocessable_entity)
          expect(response.content_type).to eq("application/json; charset=utf-8")
        end
      end
    end

    describe "DELETE #destroy" do
      it "destroys the requested match" do
        match = create(:match)
        expect {
          delete :destroy, params: { tournament_id: tournament.id, id: match.id }
        }.to change(Tournaments::Match, :count).by(-1)
      end

      it "renders a JSON response with the match" do
        delete :destroy, params: { tournament_id: tournament.id, id: match.id }
        expect(response).to have_http_status(:ok)
        expect(response.content_type).to eq("application/json; charset=utf-8")
      end
    end
  end
end
