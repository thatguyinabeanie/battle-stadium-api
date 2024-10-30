# Assuming you have factories for tournament, player, and round defined elsewhere
FactoryBot.define do
  factory :match, class: "Match" do
    phase { create(:swiss_phase) }
    tournament { phase.tournament }
    round { phase.rounds&.first || create(:round, phase:) }
    table_number { round ? round.matches.count + 1 : 1 }

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
    loser { nil }
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
