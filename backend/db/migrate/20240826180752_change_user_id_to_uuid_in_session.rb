class ChangeUserIdToUuidInSession < ActiveRecord::Migration[7.1]
  def up
    # Add a new column with the desired type and not null constraint
    add_column :session, :user_id_uuid, :uuid, null: false, default: 'uuid_generate_v4()'

    # Copy data from the old column to the new column
    execute <<-SQL.squish
      UPDATE session
      SET user_id_uuid = uuid_generate_v4()
      WHERE user_id_uuid IS NULL;
    SQL

    # Remove the old column
    remove_column :session, :userId

    # Rename the new column to the old column name
    rename_column :session, :user_id_uuid, :user_id
  end

  def down
    # Add the old column back with not null constraint
    add_column :session, :userId, :integer, null: false # rubocop:disable Rails/NotNullColumn

    # Copy data from the new column to the old column
    execute <<-SQL.squish
      UPDATE session
      SET "userId" = NULL
      WHERE "userId" IS NULL;
    SQL

    # Remove the new column
    remove_column :session, :user_id
  end
end
