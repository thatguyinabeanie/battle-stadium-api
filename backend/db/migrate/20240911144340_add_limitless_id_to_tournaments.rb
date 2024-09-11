class AddLimitlessIdToTournaments < ActiveRecord::Migration[7.2]
  def change
    add_column :tournaments, :limitless_id, :integer
    add_index :tournaments, :limitless_id, unique: true, where: "limitless_id IS NOT NULL"
  end
end
