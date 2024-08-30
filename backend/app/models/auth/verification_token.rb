module Auth
  class VerificationToken < ApplicationRecord
    belongs_to :user, foreign_key: 'user_id', inverse_of: :verification_token, class_name: 'User'
  end
end
