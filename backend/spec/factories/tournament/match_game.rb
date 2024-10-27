FactoryBot.define do
  factory :match_game, class: "MatchGame" do
    match factory: :match
    sequence(:game_number) { |n| n }

    winner { nil }
    loser { nil }
    reporter { nil }

    started_at { nil }
    ended_at { nil }

    trait :with_winner_player_one do
      after(:build) do |match_game|
        match_game.winner = match_game.match.player_one
        match_game.loser = match_game.match.player_two
        match_game.reporter = match_game.match.player_one.profile
        match_game.started_at = Time.current.utc
        match_game.ended_at = Time.current.utc + 20.minutes
      end
    end

    trait :with_winner_player_two do
      after(:build) do |match_game|
        match_game.winner = match_game.match.player_two
        match_game.loser = match_game.match.player_one
        match_game.reporter = match_game.match.player_one.profile
        match_game.started_at = Time.current.utc
        match_game.ended_at = Time.current.utc + 20.minutes
      end
    end
  end
end
