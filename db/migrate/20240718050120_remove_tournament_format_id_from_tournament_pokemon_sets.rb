class RemoveTournamentFormatIdFromTournamentPokemonSets < ActiveRecord::Migration[7.1]
  def change
    remove_column :tournament_pokemon_sets, :tournament_format_id, :integer
  end
end
