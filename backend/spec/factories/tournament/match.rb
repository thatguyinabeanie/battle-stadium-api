# Assuming you have factories for tournament, player, and round defined elsewhere
FactoryBot.define do
  factory :match, class: "Tournaments::Match" do
    sequence(:table_number) { |n| n }
    tournament { create(:tournament, :with_phases) }
    phase { tournament.phases.first }
    round { create(:round, phase:) }

    player_one do
      if phase.players.present?
        phase.players.first
      else
        create(:player)
      end
    end

    player_two do
      if phase.players.present?
        phase.players.second
      else
        create(:player)
      end
    end

    player_one_check_in { nil }
    player_two_check_in { nil }

    winner { nil }
    loser do
      if winner.present?
        player_one == winner ? player_two : player_one
      end
    end
    bye { false }

    match_games { [] }

    trait :with_match_games do
      transient do
        match_game_count { 1 }
      end

      after(:create) do |match, evaluator|
        create_list(:match_game, evaluator.match_game_count, match:)
      end
    end
  end
end
