class UpdateChatMessagesColumns < ActiveRecord::Migration[7.2]
  def change
    add_reference :chat_messages, :user, type: :uuid, foreign_key: true
    add_column :chat_messages, :message_type, :string
    add_column :chat_messages, :sent_at, :datetime
    remove_column :chat_messages, :created_at, :datetime
    remove_column :chat_messages, :updated_at, :datetime
  end
end
