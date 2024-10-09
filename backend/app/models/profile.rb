class Profile < ApplicationRecord
  extend FriendlyId
  friendly_id :username, use: :slugged

  belongs_to :user, inverse_of: :profiles, class_name: "User", foreign_key: "user_id"

  has_many :players, class_name: "Tournaments::Player", inverse_of: :profile,  foreign_key: "profile_id"
  has_many :pokemon_teams, class_name: "PokemonTeam", inverse_of: :profile,  foreign_key: "profile_id"

  validates :username, presence: true, uniqueness: true


  def should_generate_new_friendly_id?
    username_changed?
  end
end
