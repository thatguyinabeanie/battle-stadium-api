class RenamePokemonSetsToPokemon < ActiveRecord::Migration[7.1]
  def change
    rename_table :pokemon_sets, :pokemon
  end
end
