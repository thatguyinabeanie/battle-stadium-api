module Auth
  class Session < ApplicationRecord
    self.table_name = 'session'
    belongs_to :user, inverse_of: :session, class_name: 'User'
  end
end
