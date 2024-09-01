require_relative '../../../lib/token_encryptor'

module Auth
  class Session < ApplicationRecord
    belongs_to :user, inverse_of: :sessions, class_name: 'User'

    validates :token, presence: true, uniqueness: true
    validates :jti, presence: true, uniqueness: true

    validates :expires_at, presence: true

    SESSION_DURATOIN = 1.day

    before_validation :generate_jti, on: :create
    before_validation :generate_token, on: :create
    before_validation :set_expires_at, on: :create

    def active?
      expires_at > Time.now.utc
    end

    def update
      self.expires_at = Time.now.utc + SESSION_DURATOIN

      save!
    end

    def revoke
      self.expires_at = Time.now.utc
      destroy
    end

    def jwt_payload
      {
        name: user.username,
        email: user.email,
        picture: user.image,
        sub: user.id,
        iat: Time.now.utc.to_i,
        exp: expires_at.to_i,
        jti: jti,
        token: token,
      }
    end
    def encrypted_jwt
      TokenEncryptor.encrypt(jwt_payload)
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
