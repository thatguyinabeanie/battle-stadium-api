FactoryBot.define do
  factory :clerk_user do
    account factory: :account
    clerk_user_id { SecureRandom.alphanumeric(25) }
  end
end
