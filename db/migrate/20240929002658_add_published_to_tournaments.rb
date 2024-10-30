class AddPublishedToTournaments < ActiveRecord::Migration[7.2]
  def change
    add_column :tournaments, :published, :boolean, null: false, default: false
  end
end
