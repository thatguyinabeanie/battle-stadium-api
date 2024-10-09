class RenameProfileIdToUserProfileId < ActiveRecord::Migration[7.2]
  def up
    # Rename columns
    if column_exists?(:chat_messages, :profile_id)
      rename_column :chat_messages, :profile_id, :user_profile_id
    end

    if column_exists?(:players, :profile_id)
      rename_column :players, :profile_id, :user_profile_id
    end

    if column_exists?(:pokemon_teams, :profile_id)
      rename_column :pokemon_teams, :profile_id, :user_profile_id
    end

    # Update indexes
    if index_exists?(:chat_messages, :profile_id, name: "index_chat_messages_on_profile_id")
      rename_index :chat_messages, "index_chat_messages_on_profile_id", "index_chat_messages_on_user_profile_id"
    end

    if index_exists?(:players, :profile_id, name: "index_players_on_profile_id")
      rename_index :players, "index_players_on_profile_id", "index_players_on_user_profile_id"
    end

    if index_exists?(:pokemon_teams, :profile_id, name: "index_pokemon_teams_on_profile_id")
      rename_index :pokemon_teams, "index_pokemon_teams_on_profile_id", "index_pokemon_teams_on_user_profile_id"
    end

    # Update foreign keys
    if foreign_key_exists?(:chat_messages, :profiles)
      remove_foreign_key :chat_messages, :profiles
      add_foreign_key :chat_messages, :profiles, column: :user_profile_id
    end

    if foreign_key_exists?(:players, :profiles)
      remove_foreign_key :players, :profiles
      add_foreign_key :players, :profiles, column: :user_profile_id
    end

    if foreign_key_exists?(:pokemon_teams, :profiles)
      remove_foreign_key :pokemon_teams, :profiles
      add_foreign_key :pokemon_teams, :profiles, column: :user_profile_id
    end
  end

  def down
      # Rename columns back to original names
    rename_column :chat_messages, :user_profile_id, :profile_id
    rename_column :match_games, :user_profile_id, :reporter_id
    rename_column :players, :user_profile_id, :profile_id
    rename_column :pokemon_teams, :user_profile_id, :profile_id

      # Update indexes
    if index_exists?(:chat_messages, :user_profile_id, name: "index_chat_messages_on_user_profile_id")
      rename_index :chat_messages, "index_chat_messages_on_user_profile_id", "index_chat_messages_on_profile_id"
    end

    if index_exists?(:players, :user_profile_id, name: "index_players_on_user_profile_id")
      rename_index :players, "index_players_on_user_profile_id", "index_players_on_profile_id"
    end

    if index_exists?(:pokemon_teams, :user_profile_id, name: "index_pokemon_teams_on_user_profile_id")
      rename_index :pokemon_teams, "index_pokemon_teams_on_user_profile_id", "index_pokemon_teams_on_profile_id"
    end

      # Update foreign keys
    if foreign_key_exists?(:chat_messages, :profiles, column: :user_profile_id)
      remove_foreign_key :chat_messages, column: :user_profile_id
      add_foreign_key :chat_messages, :profiles, column: :profile_id
    end

    if foreign_key_exists?(:players, :profiles, column: :user_profile_id)
      remove_foreign_key :players, column: :user_profile_id
      add_foreign_key :players, :profiles, column: :profile_id
    end

    if foreign_key_exists?(:pokemon_teams, :profiles, column: :user_profile_id)
      remove_foreign_key :pokemon_teams, column: :user_profile_id
      add_foreign_key :pokemon_teams, :profiles, column: :profile_id
    end
  end
end
