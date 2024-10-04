module Phases
  class Swiss < BasePhase
    self.table_name = "phases"
    validates :type, equality: { value: "Phases::Swiss" }

    after_save :create_initial_round, if: -> { saved_change_to_started_at?(from: nil) }

    belongs_to :current_round, class_name: "Tournaments::Round", optional: true

    validates :current_round, presence: true, if: -> { started_at.present? }

    delegate :round_number, to: :current_round, allow_nil: true

    def start!
      raise "The phase has already started" if started_at.present?
      raise "The phase has no players" if players.empty?

      self.current_round = create_initial_round
      self.started_at = Time.current.utc
      self.save!
    end

    def accept_players(players:)

      ready_players = players&.checked_in_and_submitted_team_sheet
      raise "Number of players must be greater than zero" unless ready_players&.count&.positive?

      self.players << ready_players
      self.number_of_rounds =  Math.log2(ready_players.count).ceil
      self.save!
    end

    def create_initial_round
      rounds.create(round_number: 1)
    end

    def create_next_round
      rounds.create(round_number: rounds.count + 1)
    end

    protected

    def set_defaults
      self.type ||= "Phases::Swiss"
      self.name ||= "Swiss Rounds"
      super
    end
  end
end
