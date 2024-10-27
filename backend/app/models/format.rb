# typed: true


class Format < ApplicationRecord
  self.table_name = "formats"
  belongs_to :game, class_name: "Game"
  validates :name, presence: true, uniqueness: { scope: :game_id }, length: { maximum: 255 }
  validates :game, presence: true
  end
