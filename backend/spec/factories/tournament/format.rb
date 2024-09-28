FactoryBot.define do
  factory :format, class: "Tournaments::Format" do
    sequence(:name) { |n| "Regulation #{n}" }
    game factory: :game
  end
end
