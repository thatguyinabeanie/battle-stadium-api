module Auth
  class Session < ApplicationRecord
    self.table_name = 'session'
    belongs_to :user, foreign_key: 'user_id', inverse_of: :session, class_name: 'User'
  end
end
