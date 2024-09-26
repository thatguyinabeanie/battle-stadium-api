class RemoveUserIdFromPokemonTeams < ActiveRecord::Migration[7.2]
  def change
    remove_column :pokemon_teams, :user_id, :integer
  end
end
