FactoryBot.define do
  factory :profile do
    user factory: :user
    username { Faker::Internet.unique.username }
    players { [] }
  end
end
