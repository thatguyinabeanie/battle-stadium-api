module Auth
  class Session < ApplicationRecord
    belongs_to :user, inverse_of: :sessions, class_name: 'User'

    validates :token, presence: true, uniqueness: true
    validates :expires_at, presence: true

    EXPIRES_AT=3.days.from_now

    before_validation :generate_token, on: :create
    before_validation :set_expires_at, on: :create

    def active?
      self.expires_at > Time.now
    end

    private

    def generate_token
      self.token ||= SecureRandom.hex(32)
    end

    def set_expires_at
      self.expires_at ||= EXPIRES_AT
    end

    def revoke_session
      self.expires_at = Time.now
    end
  end
end
