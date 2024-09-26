# app/channels/chat_channel.rb
class ChatChannel < ApplicationCable::Channel
  attr_reader :subscription_data

  MAX_MESSAGE_SIZE = 1.megabyte

  def subscribed
    match_id = params[:room]
    if authorized_to_join?(match_id:)
      @subscription_data = { room: params[:room] }
      stream_from "chat_#{params[:room]}"
      Rails.logger.info "Subscribed to chat_#{params[:room]}"
    else
      reject
      Rails.logger.warn "Subscription rejected for invalid room ID: #{params[:room]}"
    end
  end

  def unsubscribed
    Rails.logger.info "Unsubscribed from chat_#{params[:room]}"
    # Ensure params[:room] is not nil before accessing it
    if params[:room].present?
      stop_all_streams
    else
      Rails.logger.warn "Room ID is nil during unsubscription"
    end
  end

  def speak(data)
    return unless params[:room].present? && data["message"].present? && current_user.present?

    user_id = current_user.id

    timestamp = Time.now.strftime("%Y-%m-%d %H:%M:%S.%L")

    match = Tournaments::Match.find_by(id: params[:room])
    if match.round.ended_at != nil
      message = "Match completed. No further messages allowed."
      Rails.logger.warn "Message rejected because the match is completed: #{params[:room]}"
      ActionCable.server.broadcast(chat_channel, {
        user_id: nil,
        timestamp:,
        message:,
        type: "system",
        key: unique_key(user_id:, timestamp:, message:, type: "system")
      })
      return
    end

    message = data["message"]
    message_size = message.is_a?(String) ? message.bytesize : message.to_json.bytesize
    raise ArgumentError, "Message is too large" if message_size > MAX_MESSAGE_SIZE

    ActionCable.server.broadcast(chat_channel, {
      user_id:,
      timestamp:,
      message:,
      type: "text",
      key: unique_key(user_id:, timestamp:, message:, type: "text"),
    });
  end

  private

  def chat_channel
    "chat_#{@subscription_data[:room]}"
  end

  def unique_key(user_id:, timestamp: nil, message:, type:)
    Digest::SHA256.hexdigest("#{chat_channel}-#{user_id}-#{timestamp}-#{message}-#{type}")
  end

  def authorized_to_join?(match_id:)
    match = Tournaments::Match.find_by(id: match_id)
    return false unless match.present? && match.round.ended_at.nil?

    match.can_access?(user: current_user)
  end

  def load_previous_messages(match_id:)
    match = Tournaments::Match.find(match_id)
    messages = match.chat_messages.order(created_at: :asc)

    messages.each do |message|
      transmit({
        user_id: message.user_id,
        message: message.content,
        created_at: message.created_at.strftime("%Y-%m-%d %H:%M:%S")
      })
    end
  end
end
