class RenameUsersToAccounts < ActiveRecord::Migration[7.2]
  def change
    rename_table :users, :accounts
  end
end
