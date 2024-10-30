class CreateChatMessages < ActiveRecord::Migration[7.2]
  def change
    create_table :chat_messages, id: :uuid do |t|
      t.references :match, null: false, foreign_key: true, type: :bigint
      t.references :user, null: false, foreign_key: true, type: :uuid
      t.text :content

      t.timestamps
    end
  end
end
