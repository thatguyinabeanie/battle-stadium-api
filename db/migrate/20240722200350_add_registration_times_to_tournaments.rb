class AddRegistrationTimesToTournaments < ActiveRecord::Migration[7.1]
  def change
    add_column :tournaments, :registration_start_time, :datetime
    add_column :tournaments, :registration_end_time, :datetime
  end
end
