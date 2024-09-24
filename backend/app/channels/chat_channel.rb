# app/channels/chat_channel.rb
class ChatChannel < ApplicationCable::Channel
  def subscribed
    stream_from "chat_#{params[:room_id]}"
  end

  def unsubscribed
    Rails.logger.info "Unsubscribed from chat_#{params[:room_id]}"
  end

  def speak(data)
    user_id = current_user.id
    timestamp = Time.now.strftime("%Y-%m-%d %H:%M:%S.%L")
    message = data["message"]
    chat_channel = "chat_#{params[:room_id]}"

    unique_key = Digest::SHA256.hexdigest("#{chat_channel}-#{user_id}-#{timestamp}-#{data['message']}")
    ActionCable.server.broadcast("chat_#{params[:room_id]}", {
      key: unique_key,
      user_id:,
      timestamp:,
      message:
    })
  end
end
