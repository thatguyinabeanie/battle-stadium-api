
class MatchGame < ApplicationRecord
  include ::MatchPlayersConcern
  self.table_name = "match_games"

  belongs_to :match, class_name: "Match", inverse_of: :match_games
  belongs_to :winner, class_name: "Player", optional: true
  belongs_to :loser, class_name: "Player", optional: true
  belongs_to :reporter, class_name: "Profile", optional: true, foreign_key: "reporter_profile_id"

  validates :game_number, presence: true
  validates :reporter, presence: true, if: -> { ended_at.present? && (winner.present? || loser.present?) }
  validate :reporter_role_validation
  validates :match, presence: true

  delegate :phase, :player_one, :player_two, to: :match
  delegate :tournament, to: :phase
  delegate :organization, to: :tournament
  delegate :staff, to: :organization

  def report!(winner:, loser:, reporter:)
    self.winner = winner
    self.loser = loser
    self.reporter =  if reporter == player_one || reporter == player_two
                       reporter.profile
                  else
                    reporter.default_profile
                  end
    self.ended_at = Time.current.utc
    self.save!

    winner.game_wins += 1
    loser&.game_losses += 1 if loser.present?
    winner.save!
    loser.save! if loser.present?

    match.update_status
  end

    private

  def reporter_role_validation
    return if reporter.nil?
    return if organization.has_staff_member?(account: reporter.account)
    return if match_player?(account: reporter.account)

    errors.add(:base, I18n.t("errors.match_game.reporter_must_be_match_player_or_staff"))
  end
  end
