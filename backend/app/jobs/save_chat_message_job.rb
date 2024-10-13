class SaveChatMessageJob < ApplicationJob
  queue_as :default

  def perform(match_id:, user_profile_id:, content:, account_id:, sent_at:, message_type:)

    ChatMessage.create!(
      match_id:,
      account_id:,
      user_profile_id:,
      content:,
      message_type:,
      sent_at:
    )
  end
end
