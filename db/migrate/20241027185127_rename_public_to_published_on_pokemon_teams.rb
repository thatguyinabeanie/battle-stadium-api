class RenamePublicToPublishedOnPokemonTeams < ActiveRecord::Migration[7.2]
  def change
    rename_column :pokemon_teams, :public, :published
  end
end
