class AddPublicAndArchivedToPokemonTeams < ActiveRecord::Migration[7.2]
  def change
    add_column :pokemon_teams, :public, :boolean, default: false, null: false
    add_column :pokemon_teams, :archived, :boolean, default: false, null: false
  end
end
