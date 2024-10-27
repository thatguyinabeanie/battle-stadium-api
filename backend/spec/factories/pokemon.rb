FactoryBot.define do
  factory :pokemon, class: "Pokemon" do
    sequence(:position) { |n| n }
    pokemon_team { FactoryBot.create(:pokemon_team) }
    species { Faker::Games::Pokemon.name }
    nickname { nil }
    gender { 2 }
    ability { "ability_#{rand(1..3)}" }
    nature {  "nature_#{rand(1..25)}" }
    tera_type { "type_#{rand(1..18)}" }
    item { "item_#{rand(1..10)}" }
    form { nil }

    move1 {  Faker::Games::Pokemon.move }
    move2 {  Faker::Games::Pokemon.move }
    move3 {  Faker::Games::Pokemon.move }
    move4 {  Faker::Games::Pokemon.move }
  end
end
