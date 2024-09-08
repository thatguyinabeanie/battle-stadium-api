class AddClerkUserIdToUsers < ActiveRecord::Migration[7.1]
  def change
    add_column :users, :clerk_user_id, :string, null: false
    add_index :users, :clerk_user_id, unique: true
  end
end
