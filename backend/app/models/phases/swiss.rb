module Phases
  class Swiss < Phases::BasePhase
    self.table_name = "phases"

    validates :number_of_rounds, numericality: { greater_than: 0, only_integer: true }, presence: true
    validates :type, equality: { value: "Phases::Swiss" }

    def create_initial_round
      rounds.create(round_number: 1)
    end

    def create_next_round
      rounds.create(round_number: rounds.count + 1)
    end

    def start
      update(started_at: Time.current.utc)
    end

    after_save :create_initial_round, if: -> { saved_change_to_started_at?(from: nil) }
  end
end
