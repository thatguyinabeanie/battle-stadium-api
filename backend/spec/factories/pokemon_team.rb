FactoryBot.define do
  factory :pokemon_team, class: "PokemonTeam" do
    user_profile

    pokemon { [] }

    trait :with_pokemon do
      after(:create) do |pokemon_team|
        create_list(:pokemon, 6, pokemon_team:)
      end
    end
  end
end
