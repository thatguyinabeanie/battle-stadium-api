# app/models/pokemon_team.rb
class PokemonTeam < ApplicationRecord
  belongs_to :user_profile, class_name: "UserProfile", optional: false, inverse_of: :pokemon_teams
  delegate :user , to: :user_profile

  has_many :pokemon, class_name: "Pokemon", inverse_of: :pokemon_team, dependent: :destroy

  validates :user_profile_id, presence: true
  validate :no_more_than_six_pokemon

  private

  def no_more_than_six_pokemon
    return unless pokemon.size > 6

    errors.add(:pokemon, "Too many Pokemon.")
  end
end
