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
          return clerk_user.account if clerk_user

          required_attributes = ["userId", "email", "username", "firstName", "lastName"]
          missing_attributes = required_attributes.reject { |attr| session[attr] }
          unless session && missing_attributes.empty?
            raise Auth::Clerk::TokenVerifier::InvalidSessionToken, "Invalid session token. Missing attributes: #{missing_attributes.join(', ')}."
          end

          # If the account is not in the database, check if the Account is in the database with the email or username
          account = Account.find_or_create_by(email: session["email"], username: session["username"]) do |u|
            u.first_name = session["firstName"]
            u.last_name = session["lastName"]
          end

          ActiveRecord::Base.transaction do
            account.clerk_users << ClerkUser.find_or_create_by!(clerk_user_id: session["userId"], account:)
            account.save!
          end
          account
        end
      end
    end
  end
end
