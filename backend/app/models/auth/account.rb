module Auth
  class Account < ApplicationRecord
    self.table_name = 'account'
    belongs_to :user, foreign_key: 'userId', inverse_of: :accounts, class_name: 'User'
  end
end
