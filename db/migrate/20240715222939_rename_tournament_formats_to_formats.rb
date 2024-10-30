class RenameTournamentFormatsToFormats < ActiveRecord::Migration[7.1]
  def change
    rename_table :tournament_formats, :formats
  end
end
