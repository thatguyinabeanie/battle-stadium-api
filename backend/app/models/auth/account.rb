module Auth
  class Account < ApplicationRecord
    belongs_to :user, inverse_of: :account, class_name: 'User'
  end
end
