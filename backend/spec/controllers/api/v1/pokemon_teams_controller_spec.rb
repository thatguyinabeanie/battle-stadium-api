require "swagger_helper"
require_relative "../../../support/auth/token_verifier_mock"

RSpec.describe Api::V1::PokemonTeamsController do
  include Auth::TokenVerifier::Mock

  include_context "with Controller Specs - Clerk JWT + Vercel OIDC Token Verification"

  context "when /pokemon_teams" do
    describe "GET" do
      it "returns a list of pokemon teams" do
        team = create(:pokemon_team, :with_pokemon)

        get :index

        response_team = response.parsed_body.first

        expect(response_team).to include(
          {
            "id" => team.id,
            "name" => team.name,
            "user_profile" => {
              "id" => team.user_profile.id,
              "username" => team.user_profile.username,
              "image_url" => team.user_profile.image_url,
              "pronouns" => team.user_profile.pronouns,
            },
            "pokemon" => team.pokemon.map do |pokemon|
              {
                "id" => pokemon.id,
                "name" => pokemon.name,
                "nickname" => pokemon.nickname,
                "ability" => pokemon.ability,
                "nature" => pokemon.nature,
                "tera_type" => pokemon.tera_type,
                "held_item" => pokemon.held_item,
                "move1" => pokemon.move1,
                "move2" => pokemon.move2,
                "move3" => pokemon.move3,
                "move4" => pokemon.move4,
              }
            end,
          })
      end
    end

    describe "POST" do
      it "creates a new pokemon team" do
        user_profile = request_user.default_profile
        team = build(:pokemon_team, user_profile:)

        pokemon = build_list(:pokemon, 6).map { |pokemon| pokemon.attributes }

        params = {
          user_profile_id: user_profile.id,
          format_id: team.format.id,
          game_id: team.game.id,
          name: team.name,
          pokemon:
        }

        post(:create, params:)

        response_team = response.parsed_body

        expect(response_team).to include(
          {
            "name" => team.name,
            "archived_at" => nil,
            "game" => {
              "id" => team.game.id,
              "name" => team.game.name,
            },
            "format" => {
              "id" => team.format.id,
              "name" => team.format.name,
            },
            "user_profile" => {
              "id" => team.user_profile.id,
              "username" => team.user_profile.username,
              "image_url" => team.user_profile.image_url,
              "pronouns" => team.user_profile.pronouns,
            },
              "pokemon" => array_including(
                *team.pokemon.map do |pokemon|
                  {
                    "id" => anything, # Allow any ID since it will be generated
                    "name" => pokemon.name,
                    "nickname" => pokemon.nickname,
                    "ability" => pokemon.ability,
                    "nature" => pokemon.nature,
                    "tera_type" => pokemon.tera_type,
                    "held_item" => pokemon.held_item,
                    "move1" => pokemon.move1,
                    "move2" => pokemon.move2,
                    "move3" => pokemon.move3,
                    "move4" => pokemon.move4,
                  }
                end
                ),
          })
        expect(response).to have_http_status(:created)
      end
    end
  end
end
