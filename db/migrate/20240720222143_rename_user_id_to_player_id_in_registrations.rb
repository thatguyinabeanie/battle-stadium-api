class RenameUserIdToPlayerIdInRegistrations < ActiveRecord::Migration[7.1]
  def change
    rename_column :registrations, :user_id, :player_id
  end
end
