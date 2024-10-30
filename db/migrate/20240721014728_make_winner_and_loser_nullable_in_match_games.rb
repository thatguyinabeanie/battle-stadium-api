class MakeWinnerAndLoserNullableInMatchGames < ActiveRecord::Migration[7.1]
  def change
    change_column_null :match_games, :winner_id, true
    change_column_null :match_games, :loser_id, true
  end
end
