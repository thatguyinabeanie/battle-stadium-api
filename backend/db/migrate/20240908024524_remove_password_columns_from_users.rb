class RemovePasswordColumnsFromUsers < ActiveRecord::Migration[7.1]
  def change
    remove_index :users, :jti, unique: true
    remove_index :users, :unlock_token, unique: true
    remove_column :users, :encrypted_password, :string
    remove_column :users, :reset_password_token, :string
    remove_column :users, :reset_password_sent_at, :string
    remove_column :users, :remember_created_at, :datetime
    remove_column :users, :confirmation_token, :string
    remove_column :users, :name, :string
    remove_column :users, :jti, :string
    remove_column :users, :unlock_token, :string

  end
end
