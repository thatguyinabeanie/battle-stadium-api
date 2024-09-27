FactoryBot.define do
  factory :pokemon, class: "Pokemon" do
    name { Faker::Games::Pokemon.name }
    ability { "ability_#{rand(1..3)}" }
    nature {  "nature_#{rand(1..25)}" }
    tera_type { "type_#{rand(1..18)}" }
    held_item { "item_#{rand(1..10)}" }

    move1 {  Faker::Games::Pokemon.move }
    move2 {  Faker::Games::Pokemon.move }
    move3 {  Faker::Games::Pokemon.move }
    move4 {  Faker::Games::Pokemon.move }

    pokemon_team
  end
end
