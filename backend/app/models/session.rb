class Session < ApplicationRecord
  belongs_to :auth_user, foreign_key: 'userId'
end
