require "swearjar"

class UserProfile < ApplicationRecord
  self.table_name = "profiles"
  extend FriendlyId
  friendly_id :username, use: :slugged

  belongs_to :user, inverse_of: :user_profiles, class_name: "User", foreign_key: "user_id"

  has_many :players, class_name: "Tournaments::Player", inverse_of: :user_profile,  foreign_key: "user_profile_id"
  has_many :pokemon_teams, class_name: "PokemonTeam", inverse_of: :user_profile,  foreign_key: "user_profile_id"

  validates :username, presence: true, uniqueness: true

  # validate :username_profanity, on: :create

  delegate :pronouns, to: :user

  scope :not_archived, -> { where(archived_at: nil) }

  def should_generate_new_friendly_id?
    username_changed?
  end

  def default?
    user.default_profile == self
  end

  private

  # def username_profanity
  #   if ::Swearjar.default.profane?(username)
  #     Rails.logger.error("Profanity detected in username: #{username} by user: #{user.id} - #{user.username}")
  #     errors.add(:username, "cannot contain profanity")
  #   end
  # end
end
