class Session < ApplicationRecord
  belongs_to :user, foreign_key: 'userId', inverse_of: :sessions
end
