class RemoveUsernameFromAccounts < ActiveRecord::Migration[7.2]
  def change
    remove_column :accounts, :username, :string
  end
end
