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

        expect(response.parsed_body).to include(
          {
            "id" => team.id,
            "pokepaste_id" => team.pokepaste_id,
            "published" => true,
            "archived_at" => nil,
            "game" => {
              "id" => team.game.id,
              "name" => team.game.name,
            },
            "format" => {
              "id" => team.format.id,
              "name" => team.format.name,
            },
            "name" => team.name,
            "profile" => {
              "default" => team.profile.default?,
              "id" => team.profile.id,
              "username" => team.profile.username,
              "image_url" => team.profile.image_url,
              "pronouns" => team.profile.pronouns,
            },
            "pokemon" => array_including(
            *team.pokemon.map do |pokemon|
              {
                "species" => pokemon.species,
                "form" => pokemon.form,
                "nickname" => pokemon.nickname,
                "shiny" => pokemon.shiny,
                "gender" => pokemon.gender,
                "ability" => pokemon.ability,
                "nature" => pokemon.nature,
                "tera_type" => pokemon.tera_type,
                "item" => pokemon.item,
                "move1" => pokemon.move1,
                "move2" => pokemon.move2,
                "move3" => pokemon.move3,
                "move4" => pokemon.move4,
                "pokemon_team_id" => pokemon.pokemon_team_id,
                "position" => pokemon.position,
                "evs" => pokemon.evs,
                "ivs" => pokemon.ivs
              }
            end
            )
          }
        )
      end
    end
  end

  describe "POST" do
    it "creates a new pokemon team" do
      profile = request_account.default_profile
      team = build(:pokemon_team, profile:)

      pokemon = build_list(:pokemon, 6).map { |pokemon| pokemon.attributes }

      params = {
        profile_id: profile.id,
        format_id: team.format.id,
        game_id: team.game.id,
        name: team.name,
        pokemon:
      }

      post(:create, params:)

      expect(response.parsed_body).to include(
        {
          "published" => true,
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
          "profile" => {
            "default" => team.profile.default?,
            "id" => team.profile.id,
            "username" => team.profile.username,
            "image_url" => team.profile.image_url,
            "pronouns" => team.profile.pronouns,
          },
          "pokemon" => array_including(*team.pokemon.map do |pokemon|
            {
              "species" => pokemon.species,
              "form" => pokemon.form,
              "nickname" => pokemon.nickname,
              "shiny" => pokemon.shiny,
              "gender" => pokemon.gender,
              "ability" => pokemon.ability,
              "nature" => pokemon.nature,
              "tera_type" => pokemon.tera_type,
              "item" => pokemon.item,
              "move1" => pokemon.move1,
              "move2" => pokemon.move2,
              "move3" => pokemon.move3,
              "move4" => pokemon.move4,
              "pokemon_team_id" => pokemon.pokemon_team_id,
              "position" => pokemon.position,
              "evs" => pokemon.evs,
              "ivs" => pokemon.ivs
            }
          end)
        })

      expect(response).to have_http_status(:created)
    end
  end
end
