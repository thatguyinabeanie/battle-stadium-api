FactoryBot.define do
  factory :user do
    username { Faker::Internet.unique.username(specifier: 5..50) }
    email { "#{username}@email.gg" }
    first_name { Faker::Name.first_name }
    last_name { Faker::Name.last_name }
    password { SecurePassword.generate_secure_password }
    password_confirmation { password }
    pronouns { 'they/them' }
    admin { false }

    factory :admin do
      admin { true }
    end
  end
end
