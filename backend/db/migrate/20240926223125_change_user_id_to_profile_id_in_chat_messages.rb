class ChangeUserIdToProfileIdInChatMessages < ActiveRecord::Migration[7.2]
  def change
    # Rename the column
    rename_column :chat_messages, :user_id, :profile_id

    # Add foreign key constraint
    add_foreign_key :chat_messages, :profiles, column: :profile_id
  end
end
