FactoryBot.define do
  factory :format, class: "Format" do
    sequence(:name) { |n| "Regulation #{n}" }
    game factory: :game
  end
end
