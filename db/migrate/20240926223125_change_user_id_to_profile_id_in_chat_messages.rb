class ChangeUserIdToProfileIdInChatMessages < ActiveRecord::Migration[7.2]
  def change
    # Remove the existing foreign key constraint if it exists
    if foreign_key_exists?(:chat_messages, :users, column: :user_id)
      remove_foreign_key :chat_messages, column: :user_id
    end

    # Rename the column
    rename_column :chat_messages, :user_id, :profile_id

    # Add the new foreign key constraint
    add_foreign_key :chat_messages, :profiles, column: :profile_id
  end
end
