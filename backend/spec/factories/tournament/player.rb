FactoryBot.define do
  factory :player, aliases: [:tournament_player], class: "Tournaments::Player" do
    user factory: :user
    tournament factory: :tournament
    in_game_name { Faker::Name.name }
    pokemon_team { nil }
    checked_in_at { nil }

    trait :with_team do
      after(:build) do |player|
        player.pokemon_team = build(:pokemon_team, user: player.user)
      end
    end

    trait :checked_in do
      checked_in_at { Time.current.utc }
    end

    factory :player_checked_in, traits: [:checked_in]
    factory :player_with_team, traits: [:with_team]
    factory :player_with_team_and_checked_in, traits: %i[with_team checked_in]
  end
end
