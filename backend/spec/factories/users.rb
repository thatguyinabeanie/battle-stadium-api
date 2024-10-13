FactoryBot.define do
  factory :user, class: "::User" do
    username { Faker::Internet.unique.username }
    email { "#{username}@email.gg" }
    first_name { Faker::Name.first_name }
    last_name { Faker::Name.last_name }
    pronouns { "they/them" }
    admin { false }
    clerk_users { [] }
    default_profile { nil }
    archived_at { nil }

    after(:build) do |user|
      user.default_profile ||= build(:user_profile, user:)
    end

    after(:create) do |user|
      user.clerk_users << create(:clerk_user, user:)
    end

    factory :admin do
      admin { true }
    end
  end
end
