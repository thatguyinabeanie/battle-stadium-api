FactoryBot.define do
  factory :game, class: "Game" do
    sequence(:name) { |n| "#{Faker::Game.title} #{n}" }
    formats { [] }
  end
end
