FactoryBot.define do
  factory :user_profile, class: "::UserProfile" do
    user factory: :user
    username { Faker::Internet.unique.username }
    players { [] }
    archived_at { nil }
  end
end
