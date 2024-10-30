class ChangeDefaultForPublicInPokemonTeams < ActiveRecord::Migration[7.2]
  def change
    change_column_default :pokemon_teams, :public, from: false, to: true
  end
end
