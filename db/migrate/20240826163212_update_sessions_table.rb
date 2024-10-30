class UpdateSessionsTable < ActiveRecord::Migration[7.1]
  def up
    # Remove the existing primary key if any
    remove_column :session, :id, :integer if column_exists?(:session, :id)

    # Add the sessionToken column as a text field if it doesn't already exist
    remove_column :session, :sessionToken
    add_column :session, :sessionToken, :text, primary_key: true
  end

  def down
    raise ActiveRecord::IrreversibleMigration
  end
end
