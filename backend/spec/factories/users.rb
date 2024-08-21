require_relative '../../app/models/concerns/secure_password'

FactoryBot.define do
  factory :user do
    username { Faker::Internet.unique.username(specifier: 5..50) }
    email { "#{username}@email.gg" }
    first_name { Faker::Name.first_name }
    last_name { Faker::Name.last_name }
    password { SecurePassword.generate_secure_password }
    password_confirmation { password }
    pronouns { 'they/them' }
  end
end
