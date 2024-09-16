class Pokemon < ApplicationRecord
  self.table_name = "pokemon"
  belongs_to :pokemon_team, class_name: "PokemonTeam", inverse_of: :pokemon
  validates :pokemon_team_id, presence: true

  validates :name, presence: true
  validates :ability, presence: true
  validates :tera_type, presence: true
  validates :nature, presence: true

  validates :held_item, presence: true

  validates :move1, presence: true
  validates :move2, presence: true
  validates :move3, presence: true
  validates :move4, presence: true
end
