class Account < ApplicationRecord
  belongs_to :user, foreign_key: 'userId'
end
