class ChangeUserIdAndIdToUuidInAccount < ActiveRecord::Migration[7.1]
  def up
    # Add temporary columns with type uuid
    add_column :account, :user_id_uuid, :uuid, default: "gen_random_uuid()", null: false
    add_column :account, :id_uuid, :uuid, default: "gen_random_uuid()", null: false

    # Copy data from the integer columns to the uuid columns
    execute <<-SQL.squish
      UPDATE account
      SET user_id_uuid = uuid_generate_v4()
      WHERE user_id_uuid IS NULL;
    SQL

    execute <<-SQL.squish
      UPDATE account
      SET id_uuid = uuid_generate_v4()
      WHERE id_uuid IS NULL;
    SQL

    # Remove the old integer columns
    remove_column :account, :userId
    remove_column :account, :id

    # Rename the temporary columns to the original column names
    rename_column :account, :user_id_uuid, :userId
    rename_column :account, :id_uuid, :id # rubocop:disable Rails/DangerousColumnNames
  end

  def down
    # Add the old integer columns back
    add_column :account, :userId, :integer
    add_column :account, :id, :integer # rubocop:disable Rails/DangerousColumnNames

    # Copy data from the uuid columns to the integer columns
    execute <<-SQL.squish
      UPDATE account
      SET userId = CAST(user_id_uuid AS integer)
      WHERE userId IS NULL;
    SQL

    execute <<-SQL.squish
      UPDATE account
      SET id = CAST(id_uuid AS integer)
      WHERE id IS NULL;
    SQL

    # Remove the uuid columns
    remove_column :account, :user_id_uuid
    remove_column :account, :id_uuid
  end
end
