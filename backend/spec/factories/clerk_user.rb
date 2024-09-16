FactoryBot.define do
  factory :clerk_user do
    user factory: :user
    clerk_user_id { SecureRandom.alphanumeric(25) }
  end
end
