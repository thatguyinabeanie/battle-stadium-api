class RenameTournamentPhasePlayersToPhasePlayers < ActiveRecord::Migration[7.1]
  def change
    rename_table :tournament_phase_players, :phase_players
  end
end
