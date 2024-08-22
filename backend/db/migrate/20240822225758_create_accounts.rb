class CreateAccounts < ActiveRecord::Migration[7.1]
  def change
    create_table :accounts do |t|
      t.integer :userId, null: false
      t.string :type, null: false
      t.string :provider, null: false
      t.string :providerAccountId, null: false
      t.text :refresh_token
      t.text :access_token
      t.bigint :expires_at
      t.text :id_token
      t.text :scope
      t.text :session_state
      t.text :token_type

      t.timestamps
    end

    add_index :accounts, :userId
    add_index :accounts, %i[provider providerAccountId], unique: true
  end
end
