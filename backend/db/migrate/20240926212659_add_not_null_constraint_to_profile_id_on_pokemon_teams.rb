class AddNotNullConstraintToProfileIdOnPokemonTeams < ActiveRecord::Migration[7.2]
  def change
    change_column_null :pokemon_teams, :profile_id, false
  end
end
