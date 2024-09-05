FactoryBot.define do
  factory :session, class: "Auth::Session" do
    # Define your session attributes here
    user factory: :user
    token { SecureRandom.hex(48) }
    expires_at { Time.now.utc + 1.day }
    jti { SecureRandom.uuid }
  end
end
