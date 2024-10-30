class RenameFirstnameAndLastnameInUsers < ActiveRecord::Migration[7.1]
  def change
    rename_column :users, :firstname, :first_name
    rename_column :users, :lastname, :last_name
  end
end
