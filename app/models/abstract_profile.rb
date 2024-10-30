# app/models/profile.rb
class AbstractProfile < ApplicationRecord
  extend FriendlyId

  def self.policy_class
    ProfilePolicy
  end

  self.table_name = "profiles"
  self.inheritance_column = "type"

  friendly_id :username, use: :slugged

  belongs_to :account, class_name: "Account", inverse_of: :profiles, optional: true, foreign_key: "account_id"
  has_many :players, class_name: "Player", inverse_of: :profile, foreign_key: "profile_id"
  has_many :pokemon_teams, class_name: "PokemonTeam", inverse_of: :profile, foreign_key: "profile_id"

  validates :username, presence: true, uniqueness: true
  validates :default, inclusion: { in: [true, false] }
  validate :only_one_default_profile_per_account

  delegate :pronouns, to: :account

  scope :not_archived, -> { where(archived_at: nil) }

  def should_generate_new_friendly_id?
    username_changed?
  end

  private

  def only_one_default_profile_per_account
    if default && account.profiles.where(default: true).where.not(id:).exists?
      errors.add(:default, "can only be set to true for one profile per account")
    end
  end
end
