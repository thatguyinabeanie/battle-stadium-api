class AddUniqueIndexToClerkUserIdInClerkUsers < ActiveRecord::Migration[7.1]
  def change
    add_index :clerk_users, :clerk_user_id, unique: true
  end
end
