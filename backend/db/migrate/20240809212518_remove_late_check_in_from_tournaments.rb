class RemoveLateCheckInFromTournaments < ActiveRecord::Migration[7.1]
  def change
    remove_column :tournaments, :late_check_in, :boolean
  end
end
