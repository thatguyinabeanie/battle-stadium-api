class RenameLateCheckinToLateCheckInOnTournaments < ActiveRecord::Migration[7.1]
  def change
    rename_column :tournaments, :late_checkin, :late_check_in
  end
end
