class UpdatePokemonTeams < ActiveRecord::Migration[7.2]
  def change
    remove_column :pokemon_teams, :archived, :boolean
    add_column :pokemon_teams, :archived_at, :datetime
  end
end
