FactoryBot.define do
  factory :session do
    # Define your session attributes here
    user factory: :user
    token { SecureRandom.hex(32) }
    expires_at { Time.now + 1.hour }
  end
end
