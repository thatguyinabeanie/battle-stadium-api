class AddCountryToAccounts < ActiveRecord::Migration[7.2]
  def change
    add_column :accounts, :country, :string
  end
end
