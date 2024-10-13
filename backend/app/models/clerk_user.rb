class ClerkUser < ApplicationRecord
  belongs_to :account, inverse_of: :clerk_users
end
