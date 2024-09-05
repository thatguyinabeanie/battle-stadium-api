require "factory_bot"

module AuthorizationHeader
  def self.bearer_token(user:)
    session = FactoryBot.create(:session, user:)
    jwt = JsonWebToken.encrypt(
      {
        session: {
          sessionToken: session.token,
          user: {
            id: session.user.id,
            email: session.user.email,
            firstName: session.user.first_name,
            lastName: session.user.last_name,
            pronouns: session.user.pronouns,
            emailVerified: session.user.email_verified_at
          }
        }
      }
    )
    "Bearer #{jwt}"
  end
end
