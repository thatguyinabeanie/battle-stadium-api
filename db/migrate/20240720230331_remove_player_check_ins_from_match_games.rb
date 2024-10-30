class RemovePlayerCheckInsFromMatchGames < ActiveRecord::Migration[7.1]
  def change
    remove_column :match_games, :player1_check_in, :datetime
    remove_column :match_games, :player2_check_in, :datetime
  end
end
