class UpdateColumnsOnAccounts < ActiveRecord::Migration[7.2]
  def change
    change_column_default :accounts, :email, from: nil, to: nil
    change_column_default :accounts, :pronouns, from: nil, to: nil
    change_column_null :accounts, :pronouns, true
  end
end
