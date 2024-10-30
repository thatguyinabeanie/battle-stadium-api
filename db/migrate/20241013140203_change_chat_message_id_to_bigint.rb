class ChangeChatMessageIdToBigint < ActiveRecord::Migration[7.2]
  def up
    # Remove the existing UUID primary key
    remove_column :chat_messages, :id, :uuid

    # Add a new bigint primary key
    add_column :chat_messages, :id, :bigint, null: false, primary_key: true # rubocop:disable Rails/DangerousColumnNames

    # Update the indexes to use the new bigint id
    if index_exists?(:chat_messages, :match_id, name: "index_chat_messages_on_match_id")
      remove_index :chat_messages, name: "index_chat_messages_on_match_id"
    end
    if index_exists?(:chat_messages, :user_id, name: "index_chat_messages_on_user_id")
      remove_index :chat_messages, name: "index_chat_messages_on_user_id"
    end
    if index_exists?(:chat_messages, :user_profile_id, name: "index_chat_messages_on_user_profile_id")
      remove_index :chat_messages, name: "index_chat_messages_on_user_profile_id"
    end

    add_index :chat_messages, :match_id, name: "index_chat_messages_on_match_id"
    add_index :chat_messages, :user_id, name: "index_chat_messages_on_user_id"
    add_index :chat_messages, :user_profile_id, name: "index_chat_messages_on_user_profile_id"
  end

  def down
    # Remove the indexes
    if index_exists?(:chat_messages, :match_id, name: "index_chat_messages_on_match_id")
      remove_index :chat_messages, name: "index_chat_messages_on_match_id"
    end
    if index_exists?(:chat_messages, :user_id, name: "index_chat_messages_on_user_id")
      remove_index :chat_messages, name: "index_chat_messages_on_user_id"
    end
    if index_exists?(:chat_messages, :user_profile_id, name: "index_chat_messages_on_user_profile_id")
      remove_index :chat_messages, name: "index_chat_messages_on_user_profile_id"
    end

    # Remove the bigint primary key
    remove_column :chat_messages, :id, :bigint

    # Add the original UUID primary key
    add_column :chat_messages, :id, :uuid, default: -> { "gen_random_uuid()" }, null: false, primary_key: true # rubocop:disable Rails/DangerousColumnNames

    # Re-add the indexes with the original UUID id
    add_index :chat_messages, :match_id, name: "index_chat_messages_on_match_id"
    add_index :chat_messages, :user_id, name: "index_chat_messages_on_user_id"
    add_index :chat_messages, :user_profile_id, name: "index_chat_messages_on_user_profile_id"
  end
end
