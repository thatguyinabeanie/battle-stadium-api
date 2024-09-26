class AddProfileToPokemonTeamsWithoutNotNull < ActiveRecord::Migration[7.2]
  def change
    add_column :pokemon_teams, :profile_id, :uuid
    add_foreign_key :pokemon_teams, :profiles, column: :profile_id
  end
end
