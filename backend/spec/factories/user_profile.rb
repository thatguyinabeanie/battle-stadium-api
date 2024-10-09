FactoryBot.define do
  factory :user_profile, class: "::UserProfile" do
    user factory: :user
    username { Faker::Internet.unique.username }
    players { [] }
  end
end
