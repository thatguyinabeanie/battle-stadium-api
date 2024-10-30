class RenameTounamentTables < ActiveRecord::Migration[7.1]
  def change
    rename_table :tournament_tournaments, :tournaments
    rename_table :tournament_formats, :formats
    rename_table :tournament_tournament_formats, :tournament_formats
    rename_table :tournament_rounds, :rounds
    # rename_table :tournament_matches, :matches
    rename_table :tournament_registrations, :registrations
    rename_table :tournament_pokemon_sets, :pokemon_sets
  end
end
