class ChangeUserIdToUuidInAccount < ActiveRecord::Migration[7.1]
  def up
    # Add a temporary column with type uuid
    add_column :account, :user_id_uuid, :uuid, default: "gen_random_uuid()", null: false

    # Copy data from the integer column to the uuid column
    execute <<-SQL.squish
      UPDATE account
      SET user_id_uuid = uuid_generate_v4()
      WHERE user_id_uuid IS NULL;
    SQL

    # Remove the old integer column
    remove_column :account, :userId

    # Rename the temporary column to the original column name
    rename_column :account, :user_id_uuid, :userId
  end

  def down
    # Add the old integer column back
    add_column :account, :userId, :integer

    # Copy data from the uuid column to the integer column
    execute <<-SQL.squish
      UPDATE account
      SET userId = CAST(user_id_uuid AS integer)
      WHERE userId IS NULL;
    SQL

    # Remove the uuid column
    remove_column :account, :user_id_uuid
  end
end
