class Profile < ApplicationRecord
  belongs_to :user, inverse_of: :profiles, class_name: "User", foreign_key: "user_id"

  has_many :players, class_name: "Tournaments::Player", inverse_of: :profile, dependent: :destroy_async, foreign_key: "profile_id"

  validates :username, presence: true, uniqueness: true
end
