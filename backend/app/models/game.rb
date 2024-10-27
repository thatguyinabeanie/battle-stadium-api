# typed: true

class Game < ApplicationRecord
  validates :name, presence: true
  has_many :formats, class_name: "Format", dependent: :nullify
  has_many :tournaments, class_name: "Tournament", dependent: :nullify
end
