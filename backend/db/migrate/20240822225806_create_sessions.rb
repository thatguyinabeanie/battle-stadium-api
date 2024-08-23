class CreateSessions < ActiveRecord::Migration[7.1]
  def change
    create_table :sessions do |t|
      t.integer :userId, null: false
      t.datetime :expires, null: false
      t.string :sessionToken, null: false

      t.timestamps
    end

    add_index :sessions, :userId
    add_index :sessions, :sessionToken, unique: true
  end
end
