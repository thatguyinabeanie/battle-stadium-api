class DropAuthUsersTable < ActiveRecord::Migration[7.1]
  def change
    drop_table :auth_users
  end
end
