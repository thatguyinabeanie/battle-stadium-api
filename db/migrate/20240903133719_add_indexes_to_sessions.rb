class AddIndexesToSessions < ActiveRecord::Migration[7.1]
  def change
    add_index :sessions, :token, unique: true
    add_index :sessions, :jti, unique: true
    add_index :sessions, %i[token jti], unique: true
    add_index :sessions, %i[user_id token jti], unique: true
  end
end
