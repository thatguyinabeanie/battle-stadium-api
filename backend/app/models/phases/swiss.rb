module Phases
  class Swiss < BasePhase
    self.table_name = "phases"
    validates :type, equality: { value: "Phases::Swiss" }

    belongs_to :current_round, class_name: "Tournaments::Round", optional: true

    validates :current_round, presence: true, if: -> { started_at.present? }

    delegate :round_number, to: :current_round, allow_nil: true

    def start!
      raise "The phase has already started" if started_at.present?
      raise "The phase has no players" if players.empty?

      self.started_at = Time.current.utc
      self.current_round = self.current_round = Tournaments::Round.create_initial_round(self)
      self.save!
    end

    def accept_players(players:)
      raise "Players must be a collection of Tournaments::Player" unless players.is_a?(ActiveRecord::Relation)
      ready_players = players&.checked_in_and_submitted_team_sheet
      raise "Number of players must be greater than zero" unless ready_players&.count&.positive?

      self.players << ready_players
      self.number_of_rounds =  Math.log2(ready_players.count).ceil
      self.save!
    end

    def end_current_round
      raise "The phase has not started" unless started_at.present?
      raise "The phase does not have a valid current_round" unless current_round.present?
      current_round.end!
    end

    def create_round
      raise "The phase has not started" if started_at.blank?
      raise "The phase has not accepted players" if players.empty?
      raise "The phase has not set the number of rounds" if number_of_rounds.nil?
      raise "The phase has not set the current round" if current_round.blank?
      raise "The phase has not ended the current round" unless current_round&.matches&.in_progress&.empty?
      raise "The phase has already completed all rounds" if current_round&.round_number == number_of_rounds

      self.current_round = Tournaments::Round.create_round(self)
    end

    def calculate_resistance(player:)

      swiss_matches = Tournaments::Match.where(phase: self)
      player_matches = swiss_matches.where(player_one: player).or(swiss_matches.where(player_two: player))

      opponents = player_matches.flat_map { |match| [match.player_one, match.player_two] }.uniq - [player]
      opponents = matches.flat_map { |match| [match.player_one, match.player_two] }.uniq - [player]
      total_opponent_wins = opponents.sum(&:wins)
      total_opponent_matches = opponents.sum { |opponent| opponent.wins + opponent.losses }

      if total_opponent_matches > 0
        player.resistance = (total_opponent_wins.to_f / total_opponent_matches) * 100
      else
        player.resistance = 0
      end

      player.save!
    end

    protected

    def set_defaults
      self.type ||= "Phases::Swiss"
      self.name ||= "Swiss Rounds"
      super
    end
  end
end
