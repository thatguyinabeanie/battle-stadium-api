class RenameTournamentPlayersToPlayers < ActiveRecord::Migration[7.1]
  def change
    rename_table :tournament_players, :players
  end
end
