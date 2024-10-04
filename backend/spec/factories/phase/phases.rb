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
      number_of_rounds { 5 }
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
