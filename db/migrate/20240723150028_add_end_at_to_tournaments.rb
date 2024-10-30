class AddEndAtToTournaments < ActiveRecord::Migration[7.1]
  def change
    add_column :tournaments, :end_at, :datetime, null: true, default: nil
  end
end
