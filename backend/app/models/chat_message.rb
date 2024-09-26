class ChatMessage < ApplicationRecord
  belongs_to :match, class_name: "Tournaments::Match", foreign_key: "match_id", optional: false, validate: true
  belongs_to :user, class_name: "User", foreign_key: "user_id", optional: false, validate: true
  validates :content, presence: true
end
