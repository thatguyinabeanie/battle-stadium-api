class AddPlayerCapToTournaments < ActiveRecord::Migration[7.1]
  def change
    add_column :tournaments, :player_cap, :integer
  end
end
