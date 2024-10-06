class RenameReportedAtToEndedAtInMatches < ActiveRecord::Migration[7.2]
  def change
    rename_column :matches, :ended_at, :ended_at
    rename_column :match_games, :ended_at, :ended_at
  end
end
