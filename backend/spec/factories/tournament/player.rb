FactoryBot.define do
  factory :player, aliases: [:tournament_player], class: "Tournaments::Player" do
    user_profile factory: :user_profile

    tournament factory: :tournament
    in_game_name { Faker::Name.name }
    pokemon_team { nil }
    checked_in_at { nil }

    round_wins { 0 }
    round_losses { 0 }
    game_wins { 0 }
    game_losses { 0 }
    resistance { 0.0 }

    dropped { false }
    disqualified { false }

    before(:create) do |player|
      player.user ||= player.user_profile.user
    end

    trait :with_team do
      after(:create) do |player|
        player.pokemon_team = create(:pokemon_team, user_profile: player.user_profile)
        player.save
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
