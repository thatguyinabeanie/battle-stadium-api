class RenameEmailVerifiedInUsers < ActiveRecord::Migration[7.1]
  def up
    rename_column :users, :emailVerified, :email_verified
  end

  def down
    rename_column :users, :email_verified, :emailVerified
  end
end
