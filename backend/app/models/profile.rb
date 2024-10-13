
class Profile < ApplicationRecord
  self.table_name = "profiles"
  extend FriendlyId
  friendly_id :username, use: :slugged

  belongs_to :account, class_name: "Account", inverse_of: :profiles, optional: true, foreign_key: "account_id"


  has_many :players, class_name: "Tournaments::Player", inverse_of: :profile, foreign_key: "profile_id"
  has_many :pokemon_teams, class_name: "PokemonTeam", inverse_of: :profile, foreign_key: "profile_id"

  validates :username, presence: true, uniqueness: true

  delegate :pronouns, to: :account

  scope :not_archived, -> { where(archived_at: nil) }

  def default?
    account.default_profile == self
  end

  def should_generate_new_friendly_id?
    username_changed?
  end
end
