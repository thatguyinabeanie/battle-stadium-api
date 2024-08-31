module Auth
  class VerificationToken < ApplicationRecord
    belongs_to :user, inverse_of: :verification_token, class_name: 'User'
  end
end
