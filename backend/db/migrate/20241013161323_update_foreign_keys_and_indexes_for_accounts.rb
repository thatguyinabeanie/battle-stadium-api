class UpdateForeignKeysAndIndexesForAccounts < ActiveRecord::Migration[7.2]
  def change
    rename_column :chat_messages, :user_id, :account_id
    rename_column :clerk_users, :user_id, :account_id
    rename_column :organization_staff_members, :user_id, :account_id
    rename_column :players, :user_id, :account_id
    rename_column :profiles, :user_id, :account_id

    if index_exists?(:chat_messages, :user_id, name: "index_chat_messages_on_user_id")
      rename_index :chat_messages, "index_chat_messages_on_user_id", "index_chat_messages_on_account_id"
    end
    if index_exists?(:clerk_users, :user_id, name: "index_clerk_users_on_user_id")
      rename_index :clerk_users, "index_clerk_users_on_user_id", "index_clerk_users_on_account_id"
    end
    if index_exists?(:organization_staff_members, :user_id, name: "index_organization_staff_members_on_user_id")
      rename_index :organization_staff_members, "index_organization_staff_members_on_user_id", "index_organization_staff_members_on_account_id"
    end
    if index_exists?(:players, :user_id, name: "index_players_on_user_id")
      rename_index :players, "index_players_on_user_id", "index_players_on_account_id"
    end
    if index_exists?(:profiles, :user_id, name: "index_profiles_on_user_id")
      rename_index :profiles, "index_profiles_on_user_id", "index_profiles_on_account_id"
    end
  end
end
