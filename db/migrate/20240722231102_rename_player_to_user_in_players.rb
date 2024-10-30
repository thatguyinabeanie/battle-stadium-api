class RenamePlayerToUserInPlayers < ActiveRecord::Migration[7.1]
  def change
    rename_column :players, :player_id, :user_id
  end
end
