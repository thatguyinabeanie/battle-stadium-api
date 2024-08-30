class DropAndCreateAuthenticators < ActiveRecord::Migration[7.1]
  def up
    drop_table :authenticators

    create_table :authenticators, id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
      t.text :credential_id, null: false
      t.text :provider_account_id, null: false
      t.text :credential_public_key, null: false
      t.integer :counter, null: false
      t.text :credential_device_type, null: false
      t.boolean :credential_backed_up, null: false
      t.text :transports
      t.datetime :created_at, null: false
      t.datetime :updated_at, null: false
      t.uuid :user_id, null: false

      t.index :credential_id, name: "index_authenticators_on_credential_id", unique: true
    end

    add_foreign_key :authenticators, :users, column: :user_id
  end

  def down
    drop_table :authenticators

    create_table :authenticators, id: false, force: :cascade do |t|
      t.text :credentialID, null: false
      t.text :providerAccountId, null: false
      t.text :credentialPublicKey, null: false
      t.integer :counter, null: false
      t.text :credentialDeviceType, null: false
      t.boolean :credentialBackedUp, null: false
      t.text :transports
      t.datetime :created_at, null: false
      t.datetime :updated_at, null: false
      t.uuid :userId

      t.index :credentialID, name: "index_authenticators_on_credentialID", unique: true
    end
  end
end
