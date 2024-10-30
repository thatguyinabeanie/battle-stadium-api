class AddPokemonTeamToTournamentPlayers < ActiveRecord::Migration[7.1]
  def change
    add_reference :players, :pokemon_team, foreign_key: true
  end
end
