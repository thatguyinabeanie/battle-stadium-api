class RenameTournamentsToTournamentTournaments < ActiveRecord::Migration[7.1]
  def change
    rename_table :tournaments, :tournament_tournaments
  end
end
