class RenameMatchDetailsToMatchGames < ActiveRecord::Migration[7.1]
  def change
    rename_table :match_details, :match_games
  end
end
