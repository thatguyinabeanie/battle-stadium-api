# app/channels/chat_channel.rb
class ChatChannel < ApplicationCable::Channel
  include Pundit::Authorization
  attr_reader :subscription_data

  MAX_MESSAGE_SIZE = 1.megabyte

  class MessageTooLargeError < StandardError; end

  def subscribed
    if authorized_to_join?
      stream_from chat_channel
      Rails.logger.info "Subscribed to #{chat_channel}"
    else
      Rails.logger.warn "Subscription rejected for invalid room ID: #{params[:room]}"
      reject
    end
  rescue ActiveRecord::RecordNotFound => e
    Rails.logger.error "Subscription rejected for invalid room ID: #{params[:room]}- #{e.message}"
    reject
  end

  def unsubscribed
    # Ensure params[:room] is not nil before accessing it
    if params[:room].present?
      Rails.logger.info "Unsubscribed from #{chat_channel}"
      stop_all_streams
    else
      Rails.logger.warn "Room ID is nil during unsubscription"
    end
  end

  def speak(data)
    return unless params[:room].present? && data["message"].present? && current_account.present?

    sent_at = Time.current.utc.to_s

    match&.reload
    if match&.round&.ended_at.present?
      message = "Match completed. No further messages allowed."
      Rails.logger.warn "Message rejected because the match is completed: #{params[:room]}"
      ActionCable.server.broadcast(chat_channel, {
        username: "SYSTEM",
        sent_at:,
        message:,
        message_type: "system",
        key: unique_key(username: "SYSTEM", sent_at:, message_type: "system")
      })
      return
    end

    message = data["message"]
    message_size = message.is_a?(String) ? message.bytesize : message.to_json.bytesize
    raise MessageTooLargeError, "Message size exceeds the maximum limit of 1MB" if message_size > MAX_MESSAGE_SIZE

    username = get_username(account: current_account)
    profile = get_profile(account: current_account)

    ActionCable.server.broadcast(chat_channel, {
      username: ,
      sent_at:,
      message:,
      message_type: "text",
      key: unique_key(username:, sent_at:, message_type: "text"),
    })

    SaveChatMessageJob.perform_later(
      match_id: match.id,
      profile_id: profile.id,
      account_id: current_account.id,
      content: message,
      message_type: "text",
      sent_at:
    )
  end

  def chat_channel
    "chat_#{params[:room]}"
  end

  private

  def get_username(account:)
    return match.player_one.username if match.player_one.account == account
    return match.player_two.username if match.player_two.account == account
    account.username
  end

  def get_profile(account:)
    return match.player_one.profile if match.player_one.account == account
    return match.player_two.profile if match.player_two.account == account
    account.profile
  end

  def format_timestr(time:)
    time.strftime("%Y-%m-%d %H:%M:%S.%L")
  end

  def match
    @match ||= Match.find_by(id: params[:room])
    @match
  end

  def authorized_to_join?

    return true if current_account.present? && current_account.admin? if ENV.fetch("ADMIN_BYPASS", "false") == "true"
    return false unless match.present? && match.round.present? && match.round.ended_at.nil?


    Pundit.policy(current_account, match).join_chat?
    true
  end

  def unique_key(username:, sent_at:, message_type:)
    Digest::SHA256.hexdigest("#{chat_channel}-#{username}-#{sent_at}-#{message_type}")
  end
end
