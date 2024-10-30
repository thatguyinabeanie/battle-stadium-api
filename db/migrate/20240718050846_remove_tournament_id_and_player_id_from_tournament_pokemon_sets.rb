class RemoveTournamentIdAndPlayerIdFromTournamentPokemonSets < ActiveRecord::Migration[7.1]
  def change
    remove_column :tournament_pokemon_sets, :tournament_id, :integer
    remove_column :tournament_pokemon_sets, :player_id, :integer
  end
end
