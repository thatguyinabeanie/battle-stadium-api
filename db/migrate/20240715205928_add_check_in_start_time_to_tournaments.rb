class AddCheckInStartTimeToTournaments < ActiveRecord::Migration[7.1]
  def change
    add_column :tournaments, :check_in_start_time, :datetime
  end
end
