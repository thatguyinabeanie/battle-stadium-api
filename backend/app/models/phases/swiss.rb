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
      self.current_round = create_next_round
      self.save!
    end

    def accept_players(players:)
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

    def create_next_round
      raise "The phase has not started" if started_at.blank?
      raise "The phase has not accepted players" if players.empty?
      raise "The phase has not set the number of rounds" if number_of_rounds.nil?
      raise "The phase has already completed all rounds" if current_round&.round_number == number_of_rounds

      next_round_number = current_round ? current_round.round_number + 1 : 1

      self.current_round = rounds.create(round_number: next_round_number)
    end

    protected

    def set_defaults
      self.type ||= "Phases::Swiss"
      self.name ||= "Swiss Rounds"
      super
    end
  end
end
