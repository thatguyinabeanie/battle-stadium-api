module Tournaments
  class MatchGame < ApplicationRecord
    include ::MatchPlayersConcern
    self.table_name = "match_games"
    belongs_to :match, class_name: "Tournaments::Match", inverse_of: :match_games

    belongs_to :winner, class_name: "Tournaments::Player", optional: true
    belongs_to :loser, class_name: "Tournaments::Player", optional: true
    belongs_to :reporter, class_name: "Profile", optional: true

    validates :game_number, presence: true
    validates :reporter, presence: true, if: -> { ended_at.present? && (winner.present? || loser.present?) }
    validate :reporter_role_validation
    validates :match, presence: true

    delegate :phase, :player_one, :player_two, to: :match
    delegate :tournament, to: :phase
    delegate :organization, to: :tournament

    private

    def reporter_role_validation
      return if reporter.nil?
      return if organization.has_staff_member?(user: reporter.user)
      return if match_player?(user: reporter.user)

      errors.add(:base, I18n.t("errors.match_game.reporter_must_be_match_player_or_staff"))
    end
  end
end
