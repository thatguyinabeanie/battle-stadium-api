FactoryBot.define do
  factory :pokemon_team, class: 'PokemonTeam' do
    user { nil }
    pokemon { build_list(:pokemon, 6) }
  end
end
