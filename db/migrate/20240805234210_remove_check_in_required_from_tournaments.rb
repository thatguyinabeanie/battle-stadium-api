class RemoveCheckInRequiredFromTournaments < ActiveRecord::Migration[7.1]
  def change
    remove_column :tournaments, :check_in_required, :boolean
  end
end
