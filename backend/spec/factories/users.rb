FactoryBot.define do
  factory :user, class: "::User" do
    sequence(:username) { |n| "user_#{n}" }
    email { "#{username}@email.gg" }
    first_name { Faker::Name.first_name }
    last_name { Faker::Name.last_name }
    pronouns { "they/them" }
    admin { false }
    clerk_users { [] }

    default_profile { nil }

    after(:create) do |user|
      user.clerk_users << create(:clerk_user, user:)
    end

    factory :admin do
      admin { true }
    end
  end
end
