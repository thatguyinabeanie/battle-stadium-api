class DropAuthUsersTable < ActiveRecord::Migration[7.1]
  def up
    drop_table :auth_users
  end

  def down
    create_table :auth_users do |t|
      # Define the table columns here
      t.string :name
      t.string :email
      # Add more columns if needed
      t.timestamps
    end
  end
end
