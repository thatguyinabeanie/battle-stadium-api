FactoryBot.define do
  factory :match_game, class: "Tournaments::MatchGame" do
    match factory: :match
    game_number { 1 }
    winner { nil }
    loser { nil }
    reporter { nil }
    ended_at { nil }
    started_at { nil }
  end
end
