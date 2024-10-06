class AddStartedAtToMatchGames < ActiveRecord::Migration[7.2]
  def change
    add_column :match_games, :started_at, :datetime
  end
end
