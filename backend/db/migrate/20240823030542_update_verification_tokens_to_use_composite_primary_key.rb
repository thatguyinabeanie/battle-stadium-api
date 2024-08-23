class UpdateVerificationTokensToUseCompositePrimaryKey < ActiveRecord::Migration[7.1]
  def up
    # Remove the existing index
    remove_index :verification_tokens, name: 'index_verification_tokens_on_identifier_and_token'

    # Change the table to use composite primary keys
    change_table :verification_tokens, id: false do |t|
      t.primary_key %i[identifier token]
    end

    # Re-add the unique index on the composite primary keys
    add_index :verification_tokens, %i[identifier token], unique: true, name: 'index_verification_tokens_on_identifier_and_token'
  end

  def down
    # Remove the composite primary keys
    change_table :verification_tokens, id: false do |t|
      t.remove_index name: 'index_verification_tokens_on_identifier_and_token'
      t.remove_primary_key
    end

    # Re-add the original unique index
    add_index :verification_tokens, %i[identifier token], unique: true, name: 'index_verification_tokens_on_identifier_and_token'
  end
end
