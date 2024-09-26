class ChatMessage < ApplicationRecord
  belongs_to :match, class_name: "Tournaments::Match", foreign_key: "match_id", optional: false, validate: true
  belongs_to :profile, class_name: "Profile", foreign_key: "profile_id", optional: false, validate: true
  delegate :user, to: :profile
  validates :content, presence: true
end
