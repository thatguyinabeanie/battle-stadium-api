class AddActualStartTimeToTournaments < ActiveRecord::Migration[7.1]
  def change
    add_column :tournaments, :actual_start_time, :datetime
  end
end
