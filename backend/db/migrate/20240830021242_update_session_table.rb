class UpdateSessionTable < ActiveRecord::Migration[7.1]
  def up
    drop_table :session
    create_table :sessions do |t|
      t.uuid :user_id, null: false
      t.text :token, null: false
      t.datetime :expires_at, null: false
      t.timestamps
    end

    add_foreign_key :sessions, :users, column: :user_id
  end

  def down
    drop_table :sessions
    create_table :session do |t|
      t.text :sessionToken, null: false
      t.datetime :expires_at, null: false
      t.timestamps
    end
  end
end
