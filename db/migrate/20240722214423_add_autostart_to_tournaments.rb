class AddAutostartToTournaments < ActiveRecord::Migration[7.1]
  def change
    add_column :tournaments, :autostart, :boolean, default: false, null: false
  end
end
