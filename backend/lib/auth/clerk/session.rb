require_relative "token_verifier"

module Auth
  module Clerk
    module Session

      class << self
        def authenticate!(request:)
          session = ::Auth::Clerk::TokenVerifier.verify(request:)

          raise Auth::Clerk::TokenVerifier::InvalidSessionToken, "Invalid session token. Missing attributes." unless session && session["userId"]

          # First check if the user is already in the database with a clerk id
          clerk_user = ClerkUser.find_by(clerk_user_id: session["userId"])
          return clerk_user.user if clerk_user

          # If the user is not in the database, check if the user is in the database with the email or username
          user = User.find_or_create_by(email: session["email"], username: session["username"]) do |u|
            u.first_name = session["firstName"]
            u.last_name = session["lastName"]
          end

          ActiveRecord::Base.transaction do
            user.clerk_users << ClerkUser.find_or_create_by!(clerk_user_id: session["userId"], user:)
            user.save!
          end
          user
        end
      end
    end
  end
end
