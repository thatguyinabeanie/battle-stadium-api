class AddPokemonTeamToPokemonSets < ActiveRecord::Migration[7.1]
  def change
    add_reference :pokemon_sets, :pokemon_team, null: false, foreign_key: true, default: 0
    remove_reference :pokemon_sets, :player, foreign_key: true
  end
end
