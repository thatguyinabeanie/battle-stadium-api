module ApplicationCable
  class Connection < ActionCable::Connection::Base
    identified_by :current_user

    def connect
      self.current_user = find_verified_user
    end

    private

    def find_verified_user
      if clerk_user = ClerkUser.find_by(clerk_user_id: cookies["userId"])
        verified_user = User.find(clerk_user.user_id)
        verified_user
      else
        reject_unauthorized_connection
      end
    end
  end
end
