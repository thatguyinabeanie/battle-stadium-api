class AddUserIdToPlayers < ActiveRecord::Migration[7.2]
  def change
    add_column :players, :user_id, :uuid, null: false
    add_foreign_key :players, :users, column: :user_id
    add_index :players, [:user_id, :tournament_id], unique: true
  end
end
