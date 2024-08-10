# typed: true

class Game < ApplicationRecord
  validates :name, presence: true
  has_many :formats, class_name: 'Tournaments::Format', dependent: :nullify
  has_many :tournaments, class_name: 'Tournaments::Tournament', dependent: :nullify
end
