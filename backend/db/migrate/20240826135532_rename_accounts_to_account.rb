class RenameAccountsToAccount < ActiveRecord::Migration[7.1]
  def change
    rename_table :accounts, :account
  end
end
