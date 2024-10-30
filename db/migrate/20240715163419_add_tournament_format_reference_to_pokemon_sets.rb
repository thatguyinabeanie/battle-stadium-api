class AddTournamentFormatReferenceToPokemonSets < ActiveRecord::Migration[7.1]
  def change
    add_reference :pokemon_sets, :tournament_format, foreign_key: true
  end
end
