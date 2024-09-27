class AddProfileToPlayers < ActiveRecord::Migration[7.2]
  def change
    # Step 1: Add the profile_id column without the NOT NULL constraint
    add_reference :players, :profile, type: :uuid, foreign_key: true

    # Step 2: Ensure all users have a default profile
    reversible do |dir|
      dir.up do
        execute <<-SQL.squish
          INSERT INTO profiles (id, user_id, username, created_at, updated_at)
          SELECT gen_random_uuid(), users.id, users.username, NOW(), NOW()
          FROM users
          WHERE NOT EXISTS (
            SELECT 1
            FROM profiles
            WHERE profiles.user_id = users.id
          )
        SQL
      end
    end

    # Step 3: Backfill the profile_id column for existing records
    reversible do |dir|
      dir.up do
        execute <<-SQL.squish
          UPDATE players
          SET profile_id = (
            SELECT profiles.id
            FROM profiles
            WHERE profiles.user_id = players.user_id
            LIMIT 1
          )
        SQL
      end
    end

    # Step 4: Add the NOT NULL constraint
    change_column_null :players, :profile_id, false

    # Step 5: Remove the user_id column
    remove_reference :players, :user, foreign_key: true
  end
end
