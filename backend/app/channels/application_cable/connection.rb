require_relative "../../../lib/auth/cookies/signature.rb"

module ApplicationCable
  class Connection < ActionCable::Connection::Base
    identified_by :current_user

    def connect
      self.current_user = find_verified_user
    end

    private

    def find_verified_user
      Rails.logger.info "Verifying user connection"

      clerk_user_id = Auth::Cookies::Signature.verify(cookie: cookies[:userId])
      raise "Invalid clerk user id" unless clerk_user_id

      Rails.logger.info "Cookie verified: #{clerk_user_id}"

      clerk_user = ClerkUser.find_by!(clerk_user_id:)
      raise "Clerk user not found" unless clerk_user

      Rails.logger.info "Clerk user found: #{clerk_user&.user_id}"

      verified_user = clerk_user&.user
      raise "User not found" unless verified_user
      Rails.logger.info "User found: #{verified_user&.id}"

      if verified_user
        Rails.logger.info "User #{verified_user.id} connected"
        verified_user
      else
        Rails.logger.info "User not found - clerk id: #{clerk_user_id} - user id: #{clerk_user&.user_id}"
        reject_unauthorized_connection
      end
    rescue StandardError => e
      Rails.logger.error "Error verifying user: #{e.message}"
      reject_unauthorized_connection
    end
  end
end
