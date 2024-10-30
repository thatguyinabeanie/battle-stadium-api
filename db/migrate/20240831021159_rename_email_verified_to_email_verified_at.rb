class RenameEmailVerifiedToEmailVerifiedAt < ActiveRecord::Migration[7.1]
  def change
    rename_column :users, :email_verified, :email_verified_at
  end
end
