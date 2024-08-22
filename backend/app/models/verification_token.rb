class VerificationToken < ApplicationRecord
  self.primary_keys = :identifier, :token
end
