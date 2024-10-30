class RenameDatesInTournaments < ActiveRecord::Migration[7.1]
  def change
    rename_column :tournaments, :start_date, :start_at
    rename_column :tournaments, :registration_start_time, :registration_start_at
    rename_column :tournaments, :registration_end_time, :registration_end_at
    rename_column :tournaments, :check_in_start_time, :check_in_start_at
    rename_column :tournaments, :actual_start_time, :started_at
  end
end
