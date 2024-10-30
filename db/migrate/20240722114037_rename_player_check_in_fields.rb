class RenamePlayerCheckInFields < ActiveRecord::Migration[7.1]
  def change
    rename_column :matches, :player1_check_in, :player_one_check_in
    rename_column :matches, :player2_check_in, :player_two_check_in
  end
end
