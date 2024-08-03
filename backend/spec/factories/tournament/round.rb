FactoryBot.define do
  factory :round, class: 'Tournament::Round' do
    phase
    matches { [] }

    factory :swiss_round do
      phase factory: :swiss_phase
    end

    trait :matches do
      after(:create) do |round|
        create_list(:match, 3, round:)
      end
    end
  end
end
