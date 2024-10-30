class AddEndedAtToTournaments < ActiveRecord::Migration[7.1]
  def change
    add_column :tournaments, :ended_at, :datetime
  end
end
