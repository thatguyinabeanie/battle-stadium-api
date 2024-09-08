
module Auth
  class Session < ApplicationRecord
    belongs_to :user, inverse_of: :sessions, class_name: "User"

    validates :token, presence: true, uniqueness: true
    validates :jti, presence: true, uniqueness: true
    validates :expires_at, presence: true
    validates :token, uniqueness: { scope: :jti, message: ::I18n.t("errors.session.token_jti_must_be_unique") }
    validates :token, uniqueness: { scope: %i[user_id jti], message: ::I18n.t("errors.session.token_jti_user_id_must_be_unique") }

    SESSION_DURATOIN = 1.day

    class InvalidTokenOrExpiredSession < StandardError; end

  end
end
