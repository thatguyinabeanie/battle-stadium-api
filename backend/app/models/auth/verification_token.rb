module Auth
  class VerificationToken < ApplicationRecord
    self.table_name = 'verification_token'
    belongs_to :user, foreign_key: 'userId', inverse_of: :verification_tokens, class_name: 'User'
  end
end
