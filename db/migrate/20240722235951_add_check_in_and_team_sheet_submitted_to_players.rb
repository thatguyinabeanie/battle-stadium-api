class AddCheckInAndTeamSheetSubmittedToPlayers < ActiveRecord::Migration[7.1]
  def change
    add_column :players, :checked_in, :boolean, null: false, default: false
    add_column :players, :team_sheet_submitted, :boolean, null: false, default: false
  end
end
