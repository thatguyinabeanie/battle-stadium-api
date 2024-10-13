FactoryBot.define do
  factory :account, class: "::Account" do
    username { Faker::Internet.unique.username }
    email { "#{username}@email.gg" }
    first_name { Faker::Name.first_name }
    last_name { Faker::Name.last_name }
    pronouns { "they/them" }
    admin { false }
    clerk_users { [] }
    default_profile { nil }
    archived_at { nil }

    after(:build) do |account|
      account.default_profile ||= build(:profile, account:)
    end

    after(:create) do |account|
      account.clerk_users << create(:clerk_user, account:)
    end

    factory :admin do
      admin { true }
    end
  end
end
