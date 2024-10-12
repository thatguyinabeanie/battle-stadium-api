class AddNameToPokemonTeams < ActiveRecord::Migration[7.2]
  def change
    add_column :pokemon_teams, :name, :string
  end
end
