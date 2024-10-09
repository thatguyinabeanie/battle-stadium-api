class ChatMessage < ApplicationRecord
  belongs_to :match, class_name: "Tournaments::Match", foreign_key: "match_id", optional: false, validate: true
  belongs_to :user_profile, class_name: "UserProfile", foreign_key: "profile_id", optional: false, validate: true
  delegate :user, to: :user_profile
  validates :content, presence: true
end
