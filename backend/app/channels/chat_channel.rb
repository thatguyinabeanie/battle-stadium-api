# app/channels/chat_channel.rb
class ChatChannel < ApplicationCable::Channel
  def subscribed
    stream_from "chat_#{params[:room_id]}"
  end

  def speak(data)
    ActionCable.server.broadcast("chat_#{params[:room_id]}", {message: data["message"]})
  end
end
