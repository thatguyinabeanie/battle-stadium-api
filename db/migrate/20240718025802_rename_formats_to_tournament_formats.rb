class RenameFormatsToTournamentFormats < ActiveRecord::Migration[7.1]
  def change
    rename_table :formats, :tournament_formats
  end
end
