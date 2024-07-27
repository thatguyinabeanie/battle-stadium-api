FactoryBot.define do
  factory :match_game, class: 'Tournament::MatchGame' do
    match factory: :match
    winner { nil }
    loser { nil }
    reporter { nil }

    game_number { 1 }
  end
end
