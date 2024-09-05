class DropAndCreateVerificationTokens < ActiveRecord::Migration[7.1]
  def up
    drop_table :verification_token

    create_table :verification_tokens do |t|
      t.text :identifier, null: false
      t.datetime :expires_at, null: false
      t.text :token, null: false
      t.datetime :created_at, null: false
      t.datetime :updated_at, null: false

      t.index %i[identifier token], name: "index_verification_token_on_identifier_and_token", unique: true
    end
  end

  def down
    drop_table :verification_tokens

    create_table :verification_token, primary_key: %i[identifier token], force: :cascade do |t|
      t.text :identifier, null: false
      t.datetime :expires, null: false
      t.text :token, null: false
      t.datetime :created_at, null: false
      t.datetime :updated_at, null: false

      t.index %i[identifier token], name: "index_verification_token_on_identifier_and_token", unique: true
    end
  end
end
