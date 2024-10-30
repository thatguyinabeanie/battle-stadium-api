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


          # TODO: We are currently assuming that the username will be unique. However it is entirely possible for an Account to have a profile with the username already allocated
          # this is a security concern and should be addressed before releasing
          profile = Profile.find_by(username: session["username"])

          account = profile&.account || Account.create_with_username(email: session["email"], first_name: session["firstName"], last_name: session["lastName"], username: session["username"])

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
