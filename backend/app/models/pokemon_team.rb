# app/models/pokemon_team.rb
class PokemonTeam < ApplicationRecord
  belongs_to :user_profile, class_name: "UserProfile", optional: false, inverse_of: :pokemon_teams, foreign_key: "user_profile_id"

  belongs_to :format, class_name: "::Tournaments::Format", optional: false
  belongs_to :game, class_name: "Game", optional: false

  has_many :pokemon, class_name: "Pokemon", inverse_of: :pokemon_team, dependent: :destroy

  validates :user_profile_id, presence: true
  validates :public, inclusion: { in: [true, false] }
  validates :archived, inclusion: { in: [true, false] }
  validates :format, presence: true

  validate :no_more_than_six_pokemon

  delegate :user , to: :user_profile

  private

  def no_more_than_six_pokemon
    return unless pokemon.size > 6

    errors.add(:pokemon, "Too many Pokemon.")
  end
end
