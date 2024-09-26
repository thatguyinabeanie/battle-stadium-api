require_relative "../../../lib/auth/cookies/cookie_verifier.rb"

module ApplicationCable
  class Connection < ActionCable::Connection::Base
    identified_by :current_user

    def connect
      self.current_user = find_verified_user
    end

    private

    def find_verified_user
      clerk_user_id = Auth::Cookies::CookieVerifier.verify_signed_cookie(cookie: cookies[:userId])
      clerk_user = ClerkUser.find_by(clerk_user_id:)
      verified_user = User.find_by(id: clerk_user&.user_id)

      if verified_user
        Rails.logger.info "User #{verified_user.id} connected"
        verified_user
      else
        Rails.logger.info "User not found - clerk id: #{clerk_user_id} - user id: #{clerk_user&.user_id}"
        reject_unauthorized_connection
      end
    end
  end
end
