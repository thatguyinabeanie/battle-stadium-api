FactoryBot.define do
  factory :profile, class: "::Profile" do
    account factory: :account
    username { Faker::Internet.unique.username }
    players { [] }
    archived_at { nil }
  end
end
