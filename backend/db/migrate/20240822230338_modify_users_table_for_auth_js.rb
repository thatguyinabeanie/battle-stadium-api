class ModifyUsersTableForAuthJs < ActiveRecord::Migration[7.1]
  def change
    change_table :users do |t|
      t.string :name unless column_exists?(:users, :name)
      t.datetime :emailVerified unless column_exists?(:users, :emailVerified)
      t.text :image unless column_exists?(:users, :image)
    end

    add_index :users, :email, unique: true unless index_exists?(:users, :email)
  end
end
