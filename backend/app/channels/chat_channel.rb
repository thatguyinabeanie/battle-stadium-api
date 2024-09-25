# app/channels/chat_channel.rb
class ChatChannel < ApplicationCable::Channel
  attr_reader :subscription_data

  MAX_MESSAGE_SIZE = 1.megabyte

  def subscribed
    if valid_room_id?(params[:room_id])
      @subscription_data = { room_id: params[:room_id] }
      stream_from "chat_#{params[:room_id]}"
    else
      reject
    end
  end

  def unsubscribed
    Rails.logger.info "Unsubscribed from chat_#{params[:room_id]}"
  end

  def speak(data)
    return unless params[:room_id].present? && data["message"].present?
    message = data["message"]
    message_size = message.is_a?(String) ? message.bytesize : message.to_json.bytesize
    raise ArgumentError, "Message is too large" if message_size > MAX_MESSAGE_SIZE

    user_id = current_user.id
    timestamp = Time.now.strftime("%Y-%m-%d %H:%M:%S.%L")
    chat_channel = "chat_#{params[:room_id]}"

    unique_key = Digest::SHA256.hexdigest("#{chat_channel}-#{user_id}-#{timestamp}-#{message}")
    type = message.is_a?(String) ? "text" : "image"

    ActionCable.server.broadcast(chat_channel, {
      key: unique_key,
      user_id:,
      timestamp:,
      message:,
      type:
    })
  end

  private

  def valid_room_id?(room_id)
    room_id.present? && room_id.to_i > 0
  end
end
