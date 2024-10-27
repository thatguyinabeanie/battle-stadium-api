# typed: true

class Game < ApplicationRecord
  def self.policy_class
    GamePolicy
  end
  validates :name, presence: true
  has_many :formats, class_name: "Format", dependent: :nullify
  has_many :tournaments, class_name: "Tournament", dependent: :nullify
end
