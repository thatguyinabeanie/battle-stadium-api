class CreateVerificationTokens < ActiveRecord::Migration[7.1]
  def change
    create_table :verification_tokens, id: false do |t|
      t.text :identifier, null: false
      t.datetime :expires, null: false
      t.text :token, null: false

      t.timestamps
    end

    add_index :verification_tokens, %i[identifier token], unique: true
  end
end
