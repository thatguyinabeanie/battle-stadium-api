module Auth
  class Session < ApplicationRecord
    belongs_to :user, inverse_of: :sessions, class_name: 'User'

    validates :token, presence: true, uniqueness: true
    validates :expires_at, presence: true

    EXPIRES_AT=30.days.from_now.freeze

    before_validation :generate_token, on: :create
    before_validation :set_expires_at, on: :create

    private

    def generate_token
      self.token ||= SecureRandom.hex(20)
    end

    def set_expires_at
      self.expires_at ||= EXPIRES_AT
    end

    def active?
      expires_at > Time.now
    end
  end
end
