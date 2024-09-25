// components/ChatComponent.tsx
"use client";

import * as React from "react";
import { Button } from "@nextui-org/react";
import { useActionCableConnection } from "@/lib/websocket/useActionCableConnection";

export interface Message {
  key: string;
  user_id: string;
  timestamp: string;
  message: string;
}

export interface SpeakData {
  message: string;
}

export default function ChatComponent() {
  const [newMessage, setNewMessage] = React.useState("");
  const { messages, sendMessage } = useActionCableConnection<Message, SpeakData>();

  const handleSendMessage = async () => {
    sendMessage({ message: newMessage }, () => setNewMessage(""));
  };

  const disableSendButton = !newMessage || newMessage === "";

  return (
    <div>
      <h1>Chat</h1>
      <ul>
        {messages.map((msg) => (
          <li key={msg.key}>{msg.message}</li>
        ))}
      </ul>
      <input type="text" value={newMessage} onChange={(e) => setNewMessage(e.target.value)} />
      <Button
        color={disableSendButton ? "default" : "primary"}
        disabled={disableSendButton}
        onClick={handleSendMessage}
      >
        Send
      </Button>
    </div>
  );
}
