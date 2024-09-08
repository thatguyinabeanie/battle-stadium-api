FactoryBot.define do
  factory :user do
    username { Faker::Internet.unique.username(specifier: 5..50) }
    email { "#{username}@email.gg" }
    first_name { Faker::Name.first_name }
    last_name { Faker::Name.last_name }
    pronouns { "they/them" }
    clerk_user_id { Faker::Internet.uuid }
    admin { false }

    factory :admin do
      admin { true }
    end
  end
end
