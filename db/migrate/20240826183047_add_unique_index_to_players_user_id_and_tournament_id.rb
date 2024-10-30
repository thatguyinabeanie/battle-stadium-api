class AddUniqueIndexToPlayersUserIdAndTournamentId < ActiveRecord::Migration[7.1]
  def change
    add_index :players, %i[user_id tournament_id], unique: true, name: "index_players_on_user_id_and_tournament_id"
  end
end
