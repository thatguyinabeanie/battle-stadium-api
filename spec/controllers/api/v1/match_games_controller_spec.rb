require "rails_helper"
require "support/auth/token_verifier_mock"
RSpec.describe Api::V1::MatchGamesController do
  include Auth::TokenVerifier::Mock
  include_context "with Controller Specs - Clerk JWT + Vercel OIDC Token Verification"

  let!(:tournament) do
    tour = create(:tournament, :with_phases, :with_players_with_team_and_checked_in)
    tour.start!
    tour
  end

  let(:phase) { tournament.phases.first }
  let(:round) { phase.rounds.first }
  let(:phase_id) { phase.id }
  let(:round_id) { round.id }
  let(:match) { create(:match, phase:, round:) }
  let(:match_game) { create(:match_game, match:) }

  describe "GET #index" do
    it "returns a success response" do
      get :index, params: { match_id: match.id, tournament_id: tournament.id }
      expect(response).to be_successful
    end
  end

  describe "GET #show" do
    it "returns a success response" do
      get :show, params: { match_id: match.id, id: match_game.id, tournament_id: tournament.id }
      expect(response).to be_successful
    end
  end

  describe "POST report_winner" do
    context "when player one is the request account" do
      let(:request_account) { match.player_one.account }
      let(:player_id) { match.player_one.id }

      it "sets player one as the winner" do
        post :report_winner, params: { match_id: match.id, id: match_game.id, tournament_id: tournament.id, match_game: { player_id: match.player_one.id } }
        expect(response).to have_http_status(:ok)
        expect(response.parsed_body["winner"]).to eq(match.player_one.username)
        expect(response.parsed_body["loser"]).to eq(match.player_two.username)
      end

      it "sets player two as the winner" do
        post :report_winner, params: { match_id: match.id, id: match_game.id, tournament_id: tournament.id, match_game: { player_id: match.player_two.id } }
        expect(response).to have_http_status(:ok)
        expect(response.parsed_body["winner"]).to eq(match.player_two.username)
        expect(response.parsed_body["loser"]).to eq(match.player_one.username)
      end
    end

    context "when player two is the request account" do
      let(:request_account) { match.player_two.account }

      it "sets player one as the winner" do
        post :report_winner, params: { match_id: match.id, id: match_game.id, tournament_id: tournament.id, match_game: { player_id: match.player_one.id } }
        expect(response).to have_http_status(:ok)
        expect(response.parsed_body["winner"]).to eq(match.player_one.username)
        expect(response.parsed_body["loser"]).to eq(match.player_two.username)
      end

      it "sets player two as the winner" do
        post :report_winner, params: { match_id: match.id, id: match_game.id, tournament_id: tournament.id, match_game: { player_id: match.player_two.id } }
        expect(response).to have_http_status(:ok)
        expect(response.parsed_body["winner"]).to eq(match.player_two.username)
        expect(response.parsed_body["loser"]).to eq(match.player_one.username)
      end
    end

    context "when the request account is a tournament organizer staff" do
      let(:request_account) { tournament.organization.staff.first }

      it "sets player one as the winner" do
        post :report_winner, params: { match_id: match.id, id: match_game.id, tournament_id: tournament.id, match_game: { player_id: match.player_one.id } }

        expect(response.parsed_body["winner"]).to eq(match.player_one.username)
        expect(response.parsed_body["loser"]).to eq(match.player_two.username)
        expect(response).to have_http_status(:ok)
      end

      it "sets player two as the winner" do
        post :report_winner, params: { match_id: match.id, id: match_game.id, tournament_id: tournament.id, match_game: { player_id: match.player_two.id } }

        expect(response.parsed_body["winner"]).to eq(match.player_two.username)
        expect(response.parsed_body["loser"]).to eq(match.player_one.username)
        expect(response).to have_http_status(:ok)
      end
    end
  end

  describe "POST report_loser" do
    context "when player one is the request account" do
      let(:request_account) { match.player_one.account }

      it "sets player one as the loser" do
        post :report_loser, params: { match_id: match.id, id: match_game.id, tournament_id: tournament.id, match_game: { player_id: match.player_one.id } }
        expect(response.parsed_body["winner"]).to eq(match.player_two.username)
        expect(response.parsed_body["loser"]).to eq(match.player_one.username)
        expect(response).to have_http_status(:ok)
      end

      it "sets player two as the loser" do
        post :report_loser, params: { match_id: match.id, id: match_game.id, tournament_id: tournament.id, match_game: { player_id: match.player_two.id } }
        expect(response.parsed_body["winner"]).to eq(match.player_one.username)
        expect(response.parsed_body["loser"]).to eq(match.player_two.username)
        expect(response).to have_http_status(:ok)
      end
    end

    context "when player two is the request account" do
      let(:request_account) { match.player_two.account }

      it "sets player one as the loser" do
        post :report_loser, params: { match_id: match.id, id: match_game.id, tournament_id: tournament.id, match_game: { player_id: match.player_one.id } }
        expect(response.parsed_body["winner"]).to eq(match.player_two.username)
        expect(response.parsed_body["loser"]).to eq(match.player_one.username)
        expect(response).to have_http_status(:ok)
      end

      it "sets player two as the loser" do
        post :report_loser, params: { match_id: match.id, id: match_game.id, tournament_id: tournament.id, match_game: { player_id: match.player_two.id } }
        expect(response).to have_http_status(:ok)
        expect(response.parsed_body["winner"]).to eq(match.player_one.username)
        expect(response.parsed_body["loser"]).to eq(match.player_two.username)
      end
    end

    context "when the request account is a tournament organizer staff" do
      let(:request_account) { tournament.organization.staff.first }

      it "sets player one as the loser" do
        post :report_loser, params: { match_id: match.id, id: match_game.id, tournament_id: tournament.id, match_game: { player_id: match.player_one.id } }
        expect(response.parsed_body["winner"]).to eq(match.player_two.username)
        expect(response.parsed_body["loser"]).to eq(match.player_one.username)
        expect(response).to have_http_status(:ok)
      end

      it "sets player two as the loser" do
        post :report_loser, params: { match_id: match.id, id: match_game.id, tournament_id: tournament.id, match_game: { player_id: match.player_two.id } }
        expect(response).to have_http_status(:ok)
        expect(response.parsed_body["winner"]).to eq(match.player_one.username)
        expect(response.parsed_body["loser"]).to eq(match.player_two.username)
      end
    end
  end
end
