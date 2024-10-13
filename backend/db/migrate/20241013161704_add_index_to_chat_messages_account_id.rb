class AddIndexToChatMessagesAccountId < ActiveRecord::Migration[7.2]
  def change
    add_index :chat_messages, :account_id, name: "index_chat_messages_on_account_id"
  end
end
