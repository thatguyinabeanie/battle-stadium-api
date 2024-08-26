module Auth
  class Session < ApplicationRecord
    belongs_to :user, foreign_key: 'userId', inverse_of: :sessions, class_name: 'User'
  end
end
