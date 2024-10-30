class ChangeGameNumberOnMatchGames < ActiveRecord::Migration[7.1]
  def up
    change_column :match_games, :game_number, :integer, null: false, default: 1
  end

  def down
    change_column :match_games, :game_number, :integer, null: true, default: nil
  end
end
