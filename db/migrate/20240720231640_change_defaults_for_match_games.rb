class ChangeDefaultsForMatchGames < ActiveRecord::Migration[7.1]
  def change
    change_column_default :match_games, :reporter_id, from: false, to: nil
    change_column_default :match_games, :winner_id, from: false, to: nil
    change_column_default :match_games, :loser_id, from: false, to: nil
  end
end
