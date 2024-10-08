require "rails_helper"
require "support/auth/token_verifier_mock"
RSpec.describe Api::V1::Tournaments::MatchGamesController do
  include Auth::TokenVerifier::Mock
  include_context "with Controller Specs - Clerk JWT + Vercel OIDC Token Verification"

  let(:tournament) { create(:tournament, :with_phases, :with_players_with_team_and_checked_in) }
  let(:phase) { tournament.phases.first }
  let(:round) { phase.rounds.first }
  let(:phase_id) { phase.id }
  let(:round_id) { phase.current_round.id }
  let(:match) { create(:match, phase:, round:) }
  let(:match_game) { create(:match_game, match:) }

  before do
    tournament.start!
  end

  describe "GET #index" do
    it "returns a success response" do
      get :index, params: { match_id: match.id }
      expect(response).to be_successful
    end
  end

  describe "GET #show" do
    it "returns a success response" do
      get :show, params: { match_id: match.id, id: match_game.id }
      expect(response).to be_successful
    end
  end

  describe "POST report_winner" do
    context "when player one is the request user" do
      let(:request_user) { match.player_one.user }

      it "sets player one as the winner" do
        post :report_winner, params: { match_id: match.id, id: match_game.id, player_id: match.player_one.id }
        match_game.reload
        expect(match_game.winner).to eq(match.player_one)
      end

      it "sets player two as the loser" do
        post :report_winner, params: { match_id: match.id, id: match_game.id, player_id: match.player_one.id }
        match_game.reload
        expect(match_game.loser).to eq(match.player_two)
      end
    end

    context "when player two is the request user" do
      let(:request_user) { match.player_two.user }

      it "sets player two as the winner" do
        post :report_winner, params: { match_id: match.id, id: match_game.id, player_id: match.player_two.id }
        match_game.reload
        expect(match_game.winner).to eq(match.player_two)
      end

      it "sets player one as the loser" do
        post :report_winner, params: { match_id: match.id, id: match_game.id, player_id: match.player_two.id }
        match_game.reload
        expect(match_game.loser).to eq(match.player_one)
      end
    end
  end

  describe "POST report_loser" do
    let(:request_user) { match.player_one.user }

    context "when player one is the request user" do
      it "sets player one as the loser" do
        post :report_loser, params: { match_id: match.id, id: match_game.id, player_id: match.player_one.id }
        match_game.reload
        expect(match_game.loser).to eq(match.player_one)
      end

      it "sets player two as the winner" do
        post :report_loser, params: { match_id: match.id, id: match_game.id, player_id: match.player_one.id }
        match_game.reload
        expect(match_game.winner).to eq(match.player_two)
      end
    end

    context "when player two is the request user" do
      it "sets player two as the loser" do
        post :report_loser, params: { match_id: match.id, id: match_game.id, player_id: match.player_two.id }
        match_game.reload
        expect(match_game.loser).to eq(match.player_two)
      end

      it "sets player one as the winner" do
        post :report_loser, params: { match_id: match.id, id: match_game.id, player_id: match.player_two.id }
        match_game.reload
        expect(match_game.winner).to eq(match.player_one)
      end
    end
  end
end
