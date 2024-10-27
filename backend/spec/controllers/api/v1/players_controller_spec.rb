require "rails_helper"
require "support/auth/token_verifier_mock"


RSpec.describe Api::V1::PlayersController do

  include Auth::TokenVerifier::Mock
  include_context "with Controller Specs - Clerk JWT + Vercel OIDC Token Verification"

  let(:tournament) { create(:tournament) }
  let(:player) { create(:player, tournament:) }

  describe "GET #index" do
    before do
      create_list(:player, 3, tournament:)
      get :index, params: { tournament_id: tournament.id }
    end

    it "returns a successful response" do
      expect(response).to have_http_status(:ok)
    end

    it "returns all players" do
      expect(response.parsed_body.size).to eq(3)
    end
  end

  describe "GET #show" do
    before { get :show, params: { tournament_id: tournament.id, id: player.profile.id } }

    it "returns a successful response" do
      expect(response).to have_http_status(:ok)
    end

    it "returns the player details" do
      expect(response.parsed_body["id"]).to eq(player.id)
    end
  end

  describe "POST #create" do
    let(:params) do
      {
        tournament_id: tournament.id,
        in_game_name: "eminem",
        profile_id: request_account.default_profile.id
      }
    end

    context "with valid parameters" do
      it "creates a new player" do

        count_before = Player.count

        post :create, params: params

        expect(response.body).to include(params[:profile_id].to_s)
        expect(response).to have_http_status(:created)
        count_after = Player.count
        expect(count_after).to eq(count_before + 1)

      end

      it "returns a created status" do
        post :create, params: params
        expect(response).to have_http_status(:created)
      end
    end

    context "with invalid parameters" do
      it "does not create a new player" do
        expect {
          post :create, params: { tournament_id: tournament.id, player: { profile_id: -1 } }
        }.not_to change(Player, :count)
      end

      it "returns an unprocessable entity status" do
        post :create, params: { tournament_id: tournament.id, player: { username: nil } }
        expect(response).to have_http_status(:unprocessable_entity)
      end
    end
  end

  describe "PATCH #update" do
    let(:request_account) { player.profile.account }

    context "with valid parameters" do

      it "updates the player" do
        patch :update, params: { tournament_id: tournament.id, id: player.profile_id, player: {in_game_name: "NewInGameName" }}
        player.reload
        expect(player.in_game_name).to eq("NewInGameName")
      end

      it "returns a successful response" do
        patch :update, params: { tournament_id: tournament.id, id: player.profile_id, player: { in_game_name: "NewInGameName" } }
        expect(response).to have_http_status(:ok)
      end
    end

    context "with invalid parameters" do
      it "does not update the player" do
        patch :update, params: { tournament_id: tournament.id, id: player.profile_id, player: { in_game_name: nil } }
        player.reload
        expect(player.in_game_name).not_to be_nil
      end

      it "returns an unprocessable entity status" do
        patch :update, params: { tournament_id: tournament.id, id: player.profile_id, player: { in_game_name: nil } }
        expect(response).to have_http_status(:unprocessable_entity)
      end
    end
  end

  describe "DELETE #destroy" do
    let!(:player) { create(:player, tournament:) }
    let(:request_account) { player.profile.account }

    it "deletes the player" do
      expect {
        delete :destroy, params: { tournament_id: tournament.id, id: player.profile_id }
      }.to change(Player, :count).by(-1)
    end

    it "returns a successful response" do
      delete :destroy, params: { tournament_id: tournament.id, id: player.profile_id }
      expect(response).to have_http_status(:ok)
    end
  end
end
