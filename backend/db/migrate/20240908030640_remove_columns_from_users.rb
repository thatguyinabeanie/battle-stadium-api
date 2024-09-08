class RemoveColumnsFromUsers < ActiveRecord::Migration[7.1]
  def change
    remove_column :users, :sign_in_count, :integer
    remove_column :users, :current_sign_in_at, :datetime
    remove_column :users, :last_sign_in_at, :datetime
    remove_column :users, :current_sign_in_ip, :string
    remove_column :users, :confirmed_at, :datetime
    remove_column :users, :confirmation_sent_at, :datetime
    remove_column :users, :unconfirmed_email, :string
    remove_column :users, :failed_attempts, :integer
    remove_column :users, :locked_at, :datetime
    remove_column :users, :email_verified_at, :datetime
    remove_column :users, :last_sign_in_ip, :string

    rename_column :users, :image, :text
  end
end
