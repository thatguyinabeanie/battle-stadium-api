module Tournaments
  class MatchGame < ApplicationRecord
    include ::MatchPlayersConcern
    self.table_name = "match_games"
    belongs_to :match, class_name: "Tournaments::Match", inverse_of: :match_games

    belongs_to :winner, class_name: "Tournaments::Player", optional: true
    belongs_to :loser, class_name: "Tournaments::Player", optional: true
    belongs_to :reporter, class_name: "User", optional: true

    delegate :player_one, to: :match
    delegate :player_two, to: :match

    validates :game_number, presence: true
    validates :reporter, presence: true, if: -> { reported_at.present? && (winner.present? || loser.present?) }
    validate :reporter_role_validation
    validates :match, presence: true

    private

    def reporter_role_validation
      return if reporter.nil?
      return if reporter == player_one.profile.user || reporter == player_two.profile.user
      return if reporter.staff_member_of?(match.phase.tournament.organization)

      errors.add(:base, I18n.t("errors.match_game.reporter_must_be_match_player_or_staff"))
    end
  end
end
