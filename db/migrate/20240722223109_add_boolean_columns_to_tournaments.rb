class AddBooleanColumnsToTournaments < ActiveRecord::Migration[7.1]
  def change
    add_column :tournaments, :late_registration, :boolean, default: true, null: false
    add_column :tournaments, :late_checkin, :boolean, default: true, null: false
    add_column :tournaments, :check_in_required, :boolean, default: true, null: false
    add_column :tournaments, :teamlists_required, :boolean, default: true, null: false
    add_column :tournaments, :open_team_sheets, :boolean, default: true, null: false
  end
end
