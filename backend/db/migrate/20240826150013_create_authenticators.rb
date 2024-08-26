class CreateAuthenticators < ActiveRecord::Migration[7.1]
  def change
    create_table :authenticators, id: false do |t|
      t.text :credentialID, null: false
      t.bigint :userId, null: false
      t.text :providerAccountId, null: false
      t.text :credentialPublicKey, null: false
      t.integer :counter, null: false
      t.text :credentialDeviceType, null: false
      t.boolean :credentialBackedUp, null: false
      t.text :transports

      t.index :credentialID, unique: true
      t.index [:userId, :credentialID], unique: true

      t.foreign_key :users, column: :userId, on_delete: :cascade
      t.timestamps
    end
  end
end
