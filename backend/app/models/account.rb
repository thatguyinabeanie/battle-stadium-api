class Account < ApplicationRecord
  belongs_to :user, foreign_key: 'userId', inverse_of: :accounts
end
