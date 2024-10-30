class ChangeProfilesIdToBigint < ActiveRecord::Migration[7.2]
  def up
    # Remove foreign keys that reference the profiles table
    remove_foreign_key :chat_messages, :profiles, column: :user_profile_id
    remove_foreign_key :match_games, :profiles, column: :reporter_id
    remove_foreign_key :players, :profiles, column: :user_profile_id
    remove_foreign_key :pokemon_teams, :profiles, column: :user_profile_id
    remove_foreign_key :users, :profiles, column: :default_profile_id

    remove_column :chat_messages, :user_profile_id, :uuid
    add_column :chat_messages, :user_profile_id, :bigint, null: false

    remove_column :match_games, :reporter_id, :uuid
    add_column :match_games, :reporter_profile_id, :bigint

    remove_column :players, :user_profile_id, :uuid
    add_column :players, :user_profile_id, :bigint, null: false

    remove_column :pokemon_teams, :user_profile_id, :uuid
    add_column :pokemon_teams, :user_profile_id, :bigint, null: true

    remove_column :users, :default_profile_id, :uuid
    add_column :users, :default_profile_id, :bigint, null: true

    # Remove the existing UUID primary key
    remove_column :profiles, :id, :uuid
    add_column :profiles, :id, :bigint, null: false, primary_key: true # rubocop:disable Rails/DangerousColumnNames

    # Re-add foreign keys with the new bigint primary key
    add_foreign_key :chat_messages, :profiles, column: :user_profile_id
    add_foreign_key :match_games, :profiles, column: :reporter_profile_id
    add_foreign_key :players, :profiles, column: :user_profile_id
    add_foreign_key :pokemon_teams, :profiles, column: :user_profile_id
    add_foreign_key :users, :profiles, column: :default_profile_id
  end

  def down
    # Remove foreign keys that reference the profiles table
    remove_foreign_key :chat_messages, :profiles, column: :user_profile_id
    remove_foreign_key :match_games, :profiles, column: :reporter_profile_id
    remove_foreign_key :players, :profiles, column: :user_profile_id
    remove_foreign_key :pokemon_teams, :profiles, column: :user_profile_id
    remove_foreign_key :users, :profiles, column: :default_profile_id

    # Change the type of user_profile_id columns in related tables back to uuid
    remove_column :chat_messages, :user_profile_id, :bigint
    add_column :chat_messages, :user_profile_id, :uuid, null: false

    remove_column :match_games, :reporter_profile_id, :bigint
    add_column :match_games, :reporter_id, :uuid

    remove_column :players, :user_profile_id, :bigint
    add_column :players, :user_profile_id, :uuid, null: false

    remove_column :pokemon_teams, :user_profile_id, :bigint
    add_column :pokemon_teams, :user_profile_id, :uuid, null: true

    remove_column :users, :default_profile_id, :bigint
    add_column :users, :default_profile_id, :uuid, null: true

    # Change the type of id column in profiles table back to uuid
    remove_column :profiles, :id, :bigint
    add_column :profiles, :id, :uuid, null: false, primary_key: true # rubocop:disable Rails/DangerousColumnNames

    # Re-add foreign keys with the new uuid primary key
    add_foreign_key :chat_messages, :profiles, column: :user_profile_id
    add_foreign_key :match_games, :profiles, column: :reporter_id
    add_foreign_key :players, :profiles, column: :user_profile_id
    add_foreign_key :pokemon_teams, :profiles, column: :user_profile_id
    add_foreign_key :users, :profiles, column: :default_profile_id
  end
end
