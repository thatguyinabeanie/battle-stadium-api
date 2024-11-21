class AddUniqueIndexToPlayersOnTournamentIdAndAccountId < ActiveRecord::Migration[7.2]
  def change
    add_index :players, [:tournament_id, :account_id], unique: true, name: "index_players_on_tournament_and_account"
  end
end
