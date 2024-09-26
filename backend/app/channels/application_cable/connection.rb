require_relative "../../../lib/auth/cookies/signature.rb"

module ApplicationCable
  class Connection < ActionCable::Connection::Base
    identified_by :current_user

    def connect
      self.current_user = find_verified_user
    end

    private

    def find_verified_user
      clerk_user_id = Auth::Cookies::Signature.verify(cookie: cookies[:userId])
      verified_user = ClerkUser.find_by!(clerk_user_id:)&.user

      if verified_user
        verified_user
      else
        reject_unauthorized_connection
      end
    rescue StandardError => e
      Rails.logger.error "Error verifying user: #{e.message}"
      reject_unauthorized_connection
    end
  end
end
