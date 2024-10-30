class RenameReportedAtToEndedAtInMatches < ActiveRecord::Migration[7.2]
  def up
    rename_column :matches, :reported_at, :ended_at if column_exists?(:matches, :reported_at)
    rename_column :match_games, :reported_at, :ended_at if column_exists?(:match_games, :reported_at)
  end

  def down
    rename_column :matches, :ended_at, :reported_at if column_exists?(:matches, :ended_at)
    rename_column :match_games, :ended_at, :reported_at if column_exists?(:match_games, :ended_at)
  end
end
