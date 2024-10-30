class RenamePokemonSetsToTournamentPokemonSets < ActiveRecord::Migration[7.1]
  def change
    rename_table :pokemon_sets, :tournament_pokemon_sets
  end
end
