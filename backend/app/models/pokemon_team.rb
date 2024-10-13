# app/models/pokemon_team.rb
class PokemonTeam < ApplicationRecord
  belongs_to :profile, class_name: "Profile", optional: false, inverse_of: :pokemon_teams, foreign_key: "profile_id"

  belongs_to :format, class_name: "::Tournaments::Format", optional: false
  belongs_to :game, class_name: "Game", optional: false

  has_many :pokemon, class_name: "Pokemon", inverse_of: :pokemon_team, dependent: :destroy

  validates :profile_id, presence: true
  validates :public, inclusion: { in: [true, false] }
  validates :format, presence: true
  validates :pokepaste_id, presence: true, allow_nil: true

  validate :no_more_than_six_pokemon

  delegate :account , to: :profile

  private

  def no_more_than_six_pokemon
    return unless pokemon.size > 6

    errors.add(:pokemon, "Too many Pokemon.")
  end
end
