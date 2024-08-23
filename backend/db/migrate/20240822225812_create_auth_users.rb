class CreateAuthUsers < ActiveRecord::Migration[7.1]
  def change
    create_table :auth_users do |t|
      t.string :name
      t.string :email
      t.datetime :emailVerified
      t.text :image

      t.timestamps
    end

    add_index :auth_users, :email, unique: true
  end
end
