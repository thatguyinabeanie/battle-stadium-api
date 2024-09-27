class BackfillProfileIdForPokemonTeams < ActiveRecord::Migration[7.2]
  def up
    PokemonTeam.reset_column_information
    PokemonTeam.find_each do |pokemon_team|
      profile = Profile.find_by(user_id: pokemon_team.user_id)
      pokemon_team.update!(profile_id: profile.id) if profile
    end
  end

  def down
    # No need to rollback data changes
  end
end
