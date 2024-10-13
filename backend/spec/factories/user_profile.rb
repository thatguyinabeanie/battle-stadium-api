FactoryBot.define do
  factory :user_profile, class: "::UserProfile" do
    account factory: :account
    username { Faker::Internet.unique.username }
    players { [] }
    archived_at { nil }
  end
end
