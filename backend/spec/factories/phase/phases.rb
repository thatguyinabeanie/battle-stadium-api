FactoryBot.define do
  factory :phase, class: "Phases::BasePhase" do
    name { "Epic Swiss Rounds" }
    tournament factory: :tournament
    type { "Phases::BasePhase" }
    number_of_rounds { 0 }
    sequence(:order)

    # Define specific factories that inherit from the abstract phase
    factory :swiss_phase, class: "Phases::Swiss" do
      name { "Epic Swiss Rounds" }
      type { "Phases::Swiss" }

      trait :with_accepted_players do
        after(:create) do |phase|
          create_list(:player_with_team_and_checked_in, 5, tournament: phase.tournament)
          phase.accept_players(players: phase.tournament.players)
        end
      end
    end

    factory :elimination_phase, class: "Phases::SingleEliminationBracket" do
      name { "Intense Single Elimination" }
      type { "Phases::SingleEliminationBracket" }
      number_of_rounds { 3 }
    end

    trait :with_rounds do
      after(:create) do |phase|
        create_list(:round, 2, phase:)
      end
    end
  end
end
