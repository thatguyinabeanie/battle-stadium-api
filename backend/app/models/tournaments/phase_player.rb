module Tournaments
  class PhasePlayer < ApplicationRecord
    self.table_name = "phase_players"
    belongs_to :player
    belongs_to :phase, polymorphic: true
  end
end
