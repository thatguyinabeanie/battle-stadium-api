class ChangeWinnerAndLoserReferencesInMatchGames < ActiveRecord::Migration[7.1]
  def change
    remove_foreign_key :match_games, :users, column: :winner_id
    remove_foreign_key :match_games, :users, column: :loser_id
    add_foreign_key :match_games, :players, column: :winner_id
    add_foreign_key :match_games, :players, column: :loser_id
  end
end
