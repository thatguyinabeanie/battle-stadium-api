class SaveChatMessageJob < ApplicationJob
  queue_as :default

  def perform(match_id:, profile_id:, content:, account_id:, sent_at:, message_type:)


    Rails.logger.info("HELLO WORLD")
    # ChatMessage.create!(
    #   match_id:,
    #   account_id:,
    #   profile_id:,
    #   content:,
    #   message_type:,
    #   sent_at:
    # )
  end
end
