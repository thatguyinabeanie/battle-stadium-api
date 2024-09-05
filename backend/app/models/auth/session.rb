require_relative '../../../lib/json_web_token'

module Auth
  class Session < ApplicationRecord
    belongs_to :user, inverse_of: :sessions, class_name: 'User'

    validates :token, presence: true, uniqueness: true
    validates :jti, presence: true, uniqueness: true
    validates :expires_at, presence: true
    validates :token, uniqueness: { scope: :jti, message: ::I18n.t('errors.session.token_jti_must_be_unique') }
    validates :token, uniqueness: { scope: %i[user_id jti], message: ::I18n.t('errors.session.token_jti_user_id_must_be_unique') }

    SESSION_DURATOIN = 1.day

    before_validation :generate_jti, on: :create
    before_validation :generate_token, on: :create
    before_validation :set_expires_at, on: :create

    class InvalidTokenOrExpiredSession < StandardError; end

    def active?
      expires_at > Time.now.utc
    end

    def refresh
      self.expires_at = Time.now.utc + SESSION_DURATOIN

      save!
    end

    def revoke
      self.expires_at = Time.now.utc
    end

    def encrypted_jwt
      JsonWebToken.encrypt(
        {
          session: {
            sessionToken: {
              sub: user.id,
              iat: created_at.to_i,
              jti:,
              token:
            }.to_json
          }
        }
      )
    end

    def self.generate_token
      SecureRandom.hex(48)
    end

    private

    def generate_jti
      self.jti ||= SecureRandom.uuid
    end

    def generate_token
      self.token ||= self.class.generate_token
    end

    def set_expires_at
      self.expires_at ||= Time.now.utc + SESSION_DURATOIN
    end
  end
end
