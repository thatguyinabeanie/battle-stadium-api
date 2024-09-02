class RenameAccountTableAndUserIdColumn < ActiveRecord::Migration[7.1]
  def up
    rename_table :account, :accounts
    rename_column :accounts, :userId, :user_id
  end

  def down
    rename_column :accounts, :user_id, :userId
    rename_table :accounts, :account
  end
end
