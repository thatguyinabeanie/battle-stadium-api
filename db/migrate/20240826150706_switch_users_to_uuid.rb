class SwitchUsersToUuid < ActiveRecord::Migration[7.1]
  def up
    # Enable the uuid-ossp extension
    enable_extension "uuid-ossp"

    # Add the UUID column
    add_column :users, :uuid, :uuid, default: "gen_random_uuid()", null: false

    # Drop dependent foreign key constraints
    remove_foreign_key :authenticators, column: :userId
    remove_foreign_key :match_games, column: :reporter_id
    remove_foreign_key :organization_staff_members, column: :user_id
    remove_foreign_key :organizations, column: :owner_id if foreign_key_exists?(:organizations, column: :owner_id)
    remove_foreign_key :players, column: :user_id
    remove_foreign_key :pokemon_teams, column: :user_id

    # Add temporary UUID columns
    add_column :authenticators, :user_uuid, :uuid
    add_column :match_games, :reporter_uuid, :uuid
    add_column :organization_staff_members, :user_uuid, :uuid
    add_column :organizations, :owner_uuid, :uuid if column_exists?(:organizations, :owner_id)
    add_column :players, :user_uuid, :uuid
    add_column :pokemon_teams, :user_uuid, :uuid

    # Copy data from bigint columns to UUID columns
    execute <<-SQL.squish
      UPDATE authenticators SET user_uuid = uuid_generate_v4();
      UPDATE match_games SET reporter_uuid = uuid_generate_v4();
      UPDATE organization_staff_members SET user_uuid = uuid_generate_v4();
      UPDATE organizations SET owner_uuid = uuid_generate_v4() WHERE owner_id IS NOT NULL;
      UPDATE players SET user_uuid = uuid_generate_v4();
      UPDATE pokemon_teams SET user_uuid = uuid_generate_v4();
    SQL

    # Remove old bigint columns
    remove_column :authenticators, :userId
    remove_column :match_games, :reporter_id
    remove_column :organization_staff_members, :user_id
    remove_column :organizations, :owner_id if column_exists?(:organizations, :owner_id)
    remove_column :players, :user_id
    remove_column :pokemon_teams, :user_id

    # Rename UUID columns to original names
    rename_column :authenticators, :user_uuid, :userId
    rename_column :match_games, :reporter_uuid, :reporter_id
    rename_column :organization_staff_members, :user_uuid, :user_id
    rename_column :organizations, :owner_uuid, :owner_id if column_exists?(:organizations, :owner_uuid)
    rename_column :players, :user_uuid, :user_id
    rename_column :pokemon_teams, :user_uuid, :user_id

    # Drop the old primary key constraint with CASCADE
    execute "ALTER TABLE users DROP CONSTRAINT users_pkey CASCADE;"

    # Add the new primary key constraint
    execute "ALTER TABLE users ADD PRIMARY KEY (uuid);"

    # Add foreign key constraints with the new primary key
    add_foreign_key :authenticators, :users, column: :userId, primary_key: :uuid, on_delete: :cascade
    add_foreign_key :match_games, :users, column: :reporter_id, primary_key: :uuid
    add_foreign_key :organization_staff_members, :users, column: :user_id, primary_key: :uuid
    add_foreign_key :organizations, :users, column: :owner_id, primary_key: :uuid
    add_foreign_key :players, :users, column: :user_id, primary_key: :uuid
    add_foreign_key :pokemon_teams, :users, column: :user_id, primary_key: :uuid

    # Remove the old primary key column
    remove_column :users, :id
  end

  def down
    # Add the old primary key column back
    add_column :users, :id, :bigint, null: false, auto_increment: true

    # Drop dependent foreign key constraints
    remove_foreign_key :authenticators, column: :userId
    remove_foreign_key :match_games, column: :reporter_id
    remove_foreign_key :organization_staff_members, column: :user_id
    remove_foreign_key :organizations, column: :owner_id if foreign_key_exists?(:organizations, column: :owner_id)
    remove_foreign_key :players, column: :user_id
    remove_foreign_key :pokemon_teams, column: :user_id

    # Add temporary bigint columns
    add_column :authenticators, :user_bigint, :bigint
    add_column :match_games, :reporter_bigint, :bigint
    add_column :organization_staff_members, :user_bigint, :bigint
    add_column :organizations, :owner_bigint, :bigint if column_exists?(:organizations, :owner_id)
    add_column :players, :user_bigint, :bigint
    add_column :pokemon_teams, :user_bigint, :bigint

    # Copy data from UUID columns to bigint columns
    execute <<-SQL.squish
      UPDATE authenticators SET user_bigint = CAST(userId AS bigint);
      UPDATE match_games SET reporter_bigint = CAST(reporter_id AS bigint);
      UPDATE organization_staff_members SET user_bigint = CAST(user_id AS bigint);
      UPDATE organizations SET owner_bigint = CAST(owner_id AS bigint) WHERE owner_id IS NOT NULL;
      UPDATE players SET user_bigint = CAST(user_id AS bigint);
      UPDATE pokemon_teams SET user_bigint = CAST(user_id AS bigint);
    SQL

    # Remove old UUID columns
    remove_column :authenticators, :userId
    remove_column :match_games, :reporter_id
    remove_column :organization_staff_members, :user_id
    remove_column :organizations, :owner_id if column_exists?(:organizations, :owner_id)
    remove_column :players, :user_id
    remove_column :pokemon_teams, :user_id

    # Rename bigint columns to original names
    rename_column :authenticators, :user_bigint, :userId
    rename_column :match_games, :reporter_bigint, :reporter_id
    rename_column :organization_staff_members, :user_bigint, :user_id
    rename_column :organizations, :owner_bigint, :owner_id if column_exists?(:organizations, :owner_bigint)
    rename_column :players, :user_bigint, :user_id
    rename_column :pokemon_teams, :user_bigint, :user_id

    # Remove the UUID column as the primary key
    execute "ALTER TABLE users DROP CONSTRAINT users_pkey;"
    execute "ALTER TABLE users ADD PRIMARY KEY (id);"

    # Restore the old foreign key references
    add_foreign_key :authenticators, :users, column: :userId, on_delete: :cascade
    add_foreign_key :match_games, :users, column: :reporter_id
    add_foreign_key :organization_staff_members, :users, column: :user_id
    add_foreign_key :organizations, :users, column: :owner_id
    add_foreign_key :players, :users, column: :user_id
    add_foreign_key :pokemon_teams, :users, column: :user_id

    # Remove the UUID column
    remove_column :users, :uuid
  end

  private

  def remove_foreign_key_if_exists(from_table, options)
    return unless foreign_key_exists?(from_table, options)

    remove_foreign_key(from_table, options)
  end
end
