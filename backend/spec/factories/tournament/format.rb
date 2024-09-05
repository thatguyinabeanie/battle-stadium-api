FactoryBot.define do
  factory :format, class: "Tournaments::Format" do
    name { "Regulation #{Faker::Number.unique.number(digits: 4)}" }
    game { nil }
  end
end
