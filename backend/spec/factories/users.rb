FactoryBot.define do
  factory :user, class: "::User" do
    username { Faker::Internet.unique.username(specifier: 5..50) }
    email { "#{username}@email.gg" }
    first_name { Faker::Name.first_name }
    last_name { Faker::Name.last_name }
    pronouns { "they/them" }
    admin { false }
    clerk_users { [] }

    after(:create) do |user|
      user.clerk_users << create(:clerk_user, user:)
    end

    factory :admin do
      admin { true }
    end
  end
end
