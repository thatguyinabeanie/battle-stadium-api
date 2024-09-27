class SaveChatMessageJob < ApplicationJob
  queue_as :default

  def perform(match_id:, profile_id:, content:, user_id:, sent_at:, message_type:)

    ChatMessage.create!(
      match_id:,
      user_id:,
      profile_id:,
      content:,
      message_type:,
      sent_at:
    )
  end
end
