class RenameUsersPrimaryKeyColumn < ActiveRecord::Migration[7.1]
  def up
    # Drop foreign key constraints
    remove_foreign_key :authenticators, :users
    remove_foreign_key :match_games, :users
    remove_foreign_key :organization_staff_members, :users
    remove_foreign_key :organizations, :users
    remove_foreign_key :players, :users
    remove_foreign_key :pokemon_teams, :users

    # Remove the existing primary key constraint
    execute "ALTER TABLE users DROP CONSTRAINT users_pkey;"

    # Rename the primary key column from uuid to id
    rename_column :users, :uuid, :id

    # Add the primary key constraint back to the id column
    execute "ALTER TABLE users ADD PRIMARY KEY (id);"

    # Re-add foreign key constraints with the correct column names
    add_foreign_key :match_games, :users, column: :reporter_id
    add_foreign_key :organization_staff_members, :users, column: :user_id
    add_foreign_key :organizations, :users, column: :owner_id
    add_foreign_key :players, :users, column: :user_id
    add_foreign_key :pokemon_teams, :users, column: :user_id
    add_foreign_key :authenticators, :users, column: :userId
  end

  def down
    raise ActiveRecord::IrreversibleMigration
  end
end
