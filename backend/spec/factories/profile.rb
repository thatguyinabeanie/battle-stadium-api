FactoryBot.define do
  factory :profile do
    user
    username { Faker::Internet.unique.username }
    players { [] }
  end
end
