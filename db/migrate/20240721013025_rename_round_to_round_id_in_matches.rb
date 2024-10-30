class RenameRoundToRoundIdInMatches < ActiveRecord::Migration[7.1]
  def up
    change_column :matches, :round, :bigint unless column_exists?(:matches, :round, :bigint)
    rename_column :matches, :round, :round_id
    add_foreign_key :matches, :rounds, column: :round_id
  end

  def down
    remove_foreign_key :matches, column: :round_id
    rename_column :matches, :round_id, :round
  end
end
