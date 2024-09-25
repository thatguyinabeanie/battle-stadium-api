# app/channels/chat_channel.rb
class ChatChannel < ApplicationCable::Channel
  attr_reader :subscription_data

  MAX_MESSAGE_SIZE = 1.megabyte

  def subscribed
    if valid_room?(params[:room])
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
      # stop_all_streams
    else
      Rails.logger.warn "Room ID is nil during unsubscription"
    end
  end

  def speak(data)
    return unless params[:room].present? && data["message"].present? && current_user.present?

    message = data["message"]
    message_size = message.is_a?(String) ? message.bytesize : message.to_json.bytesize
    raise ArgumentError, "Message is too large" if message_size > MAX_MESSAGE_SIZE

    user_id = current_user.id
    timestamp = Time.now.strftime("%Y-%m-%d %H:%M:%S.%L")
    chat_channel = "chat_#{@subscription_data[:room]}"

    unique_key = Digest::SHA256.hexdigest("#{chat_channel}-#{user_id}-#{timestamp}-#{message}")
    type = message.is_a?(String) ? "text" : "image"

    ActionCable.server.broadcast(chat_channel, {
      key: unique_key,
      user_id:,
      timestamp:,
      message:,
      type:
    });
  end

  private

  def valid_room?(room)
    room.present?
  end
end
