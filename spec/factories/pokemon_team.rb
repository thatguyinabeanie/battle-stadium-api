FactoryBot.define do
  factory :pokemon_team, class: "PokemonTeam" do
    profile
    name { "My Awesome Pokemon Team" }
    published { true }
    archived_at { nil }
    game factory: :game
    format { create(:format, game:) }
    pokepaste_id { nil }

    pokemon { [] }

    trait :with_pokemon do
      after(:create) do |pokemon_team|
        pokemon_team.pokemon = create_list(:pokemon, 6, pokemon_team:)
      end
    end
  end
end
