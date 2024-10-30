class UpdateUsernameOnUsers < ActiveRecord::Migration[7.1]
  def up
    change_column :users, :username, :string, null: true, default: ""
  end

  def down
    change_column :users, :username, :string, null: false, default: nil
  end
end
