class AddTimezoneToAccounts < ActiveRecord::Migration[7.2]
  def change
    add_column :accounts, :timezone, :string
  end
end
