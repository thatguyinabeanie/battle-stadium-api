module Auth
  class Session < ApplicationRecord
    belongs_to :user, inverse_of: :sessions, class_name: 'User'

    validates :token, presence: true, uniqueness: true
    validates :expires_at, presence: true

    SESSION_DURATOIN = 1.day

    before_validation :generate_token, on: :create
    before_validation :set_expires_at, on: :create

    def active?
      expires_at > Time.now.utc
    end

    def refresh
      self.expires_at = Time.now.utc + SESSION_DURATOIN

      save!
    end

    def revoke
      self.expires_at = Time.now.utc
      destroy
    end

    private

    def generate_token
      self.token ||= SecureRandom.hex(32)
    end

    def set_expires_at
      self.expires_at ||= Time.now.utc + SESSION_DURATOIN
    end
  end
end
