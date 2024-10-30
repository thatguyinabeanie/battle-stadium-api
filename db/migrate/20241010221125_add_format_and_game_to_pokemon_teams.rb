class AddFormatAndGameToPokemonTeams < ActiveRecord::Migration[7.2]
  def change
    add_reference :pokemon_teams, :format, null: false, foreign_key: true
    add_reference :pokemon_teams, :game, null: false, foreign_key: true
  end
end
