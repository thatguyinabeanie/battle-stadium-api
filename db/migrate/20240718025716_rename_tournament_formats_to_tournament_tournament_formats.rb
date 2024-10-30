class RenameTournamentFormatsToTournamentTournamentFormats < ActiveRecord::Migration[7.1]
  def change
    rename_table :tournament_formats, :tournament_tournament_formats
  end
end
