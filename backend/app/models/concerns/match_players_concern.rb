module MatchPlayersConcern
  extend ActiveSupport::Concern

  included do
    validates :reported_at, presence: true, if: -> { winner.present? || loser.present? }
    validates :winner, presence: true, if: -> { reported_at.present? || loser.present? }
    validates :loser, presence: true, if: -> { reported_at.present? || winner.present? }

    validate :winner_is_match_player
    validate :loser_is_match_player
    validate :winner_is_not_loser
  end

  def opponent_for(player:)
    player == player_one ? player_two : player_one
  end

  def reporter_user(reporter:)
    return reporter.user if reporter.is_a?(Tournaments::Player) && [player_one, player_two].include?(reporter)

    reporter
  end

  def report_winner!(player:, reporter:)
    winner = player
    loser = opponent_for(player:)
    report!(winner:, loser:, reporter: reporter_user(reporter:))
  end

  def report_loser!(player:, reporter:)
    winner = opponent_for(player:)
    loser = player
    report!(winner:, loser:, reporter:)
  end

  def report!(winner:, loser:, reporter: nil)
    time_now = Time.current.utc
    if respond_to?(:reporter)
      update!(winner:, loser:, reporter:, reported_at: time_now)
    else
      update!(winner:, loser:, reported_at: time_now)
    end
  end

  private

  def winner_is_match_player
    return if winner.nil? && loser.nil?

    errors.add(:base, I18n.t('errors.match_game.winner_must_be_match_player')) if [player_one, player_two].exclude?(winner)
  end

  def loser_is_match_player
    return if winner.nil? && loser.nil?

    errors.add(:base, I18n.t('errors.match_game.loser_must_be_match_player')) if [player_one, player_two].exclude?(loser)
  end

  def winner_is_not_loser
    return if winner.nil? && loser.nil?

    errors.add(:base, I18n.t('errors.match_game.winner_and_loser_are_the_same')) if winner == loser
  end
end
