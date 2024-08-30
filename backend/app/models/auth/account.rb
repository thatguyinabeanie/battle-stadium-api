module Auth
  class Account < ApplicationRecord
    belongs_to :user, foreign_key: 'user_id', inverse_of: :account, class_name: 'User'
  end
end
