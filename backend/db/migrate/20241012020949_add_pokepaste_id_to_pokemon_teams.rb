class AddPokepasteIdToPokemonTeams < ActiveRecord::Migration[7.2]
  def change
    add_column :pokemon_teams, :pokepaste_id, :string
  end
end
