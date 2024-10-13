require_relative "../../../lib/auth/cookies/signature.rb"

module ApplicationCable
  class Connection < ActionCable::Connection::Base
    identified_by :current_account

    def connect
      self.current_account = find_verified_account
    end

    private

    def find_verified_account
      clerk_user_id = Auth::Cookies::Signature.verify(cookie: cookies[:userId])
      verified_account = ClerkUser.find_by!(clerk_user_id:)&.account

      return verified_account if verified_account

      reject_unauthorized_connection
    rescue StandardError => e
      Rails.logger.error "Error verifying user: #{e.message}"
      reject_unauthorized_connection
    end
  end
end
