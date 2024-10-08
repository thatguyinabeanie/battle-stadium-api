class RenameReportedAtToEndedAtInMatches < ActiveRecord::Migration[7.2]
  def change
    rename_column :matches, :reported_at, :ended_at
    rename_column :match_games, :reported_at, :ended_at
  end
end
