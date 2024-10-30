class RefactorWinnerAndLoserInMatchGames < ActiveRecord::Migration[7.1]
  def up
    # Assuming the foreign keys were added with the default names
    # Remove existing foreign keys for winner_id and loser_id
    remove_foreign_key :match_games, column: :winner_id
    remove_foreign_key :match_games, column: :loser_id

    # Add new foreign keys referencing the players table
    add_foreign_key :match_games, :players, column: :winner_id
    add_foreign_key :match_games, :players, column: :loser_id
  end

  def down
    # Remove the foreign keys added in the up method
    remove_foreign_key :match_games, column: :winner_id
    remove_foreign_key :match_games, column: :loser_id

    # Add back the original foreign keys to the users table
    add_foreign_key :match_games, :users, column: :winner_id
    add_foreign_key :match_games, :users, column: :loser_id
  end
end
