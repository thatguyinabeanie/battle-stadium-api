FactoryBot.define do
  factory :account, class: "::Account" do
    sequence(:username) { |n| "username#{n}" }
    email { Faker::Internet.unique.email }
    first_name { Faker::Name.first_name }
    last_name { Faker::Name.last_name }
    pronouns { "they/them" }
    admin { false }
    clerk_users { [] }
    default_profile { nil }
    archived_at { nil }

    after(:create) do |account|
      account.clerk_users << create(:clerk_user, account:)
    end

    factory :admin do
      admin { true }
    end
  end
end
