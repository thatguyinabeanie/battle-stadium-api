class RenameScoreReporterToReporterOnMatchGames < ActiveRecord::Migration[7.1]
  def change
    rename_column :match_games, :score_reporter_id, :reporter_id
  end
end
