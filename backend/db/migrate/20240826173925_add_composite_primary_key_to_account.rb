class AddCompositePrimaryKeyToAccount < ActiveRecord::Migration[7.1]
  def up
    # Rename the column
    rename_column :account, :providerAccountId, :provider_account_id

    # Remove the existing primary key constraint if it exists
    remove_column :account, :id, :uuid

    # Add composite primary key
    execute <<-SQL.squish
      ALTER TABLE account ADD PRIMARY KEY (provider, provider_account_id);
    SQL
  end

  def down
    raise ActiveRecord::IrreversibleMigration
  end
end
