class DropClerkUserIdFromUsersTable < ActiveRecord::Migration[7.1]
  def change
    remove_column :users, :clerk_user_id, :string
  end
end
