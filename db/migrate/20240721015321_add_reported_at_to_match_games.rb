class AddReportedAtToMatchGames < ActiveRecord::Migration[7.1]
  def change
    add_column :match_games, :ended_at, :datetime
  end
end
