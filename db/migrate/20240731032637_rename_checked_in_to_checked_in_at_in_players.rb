class RenameCheckedInToCheckedInAtInPlayers < ActiveRecord::Migration[7.1]
  def up
    remove_column :players, :checked_in
    add_column :players, :checked_in_at, :timestamp, null: true
  end

  def down
    add_column :players, :checked_in, :boolean, null: false, default: false
    remove_column :players, :checked_in_at
  end
end
