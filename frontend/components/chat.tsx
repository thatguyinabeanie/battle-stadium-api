// components/ChatComponent.tsx
"use client";

import * as React from "react";
import { FixedSizeList as List } from "react-window";
import { Button } from "@nextui-org/react";
import { useActionCableConnection } from "@/lib/websocket/useActionCableConnection";

export interface Message {
  key: string;
  user_id: string | null;
  timestamp: string;
  message: string;
}

export interface SpeakData {
  message: string;
}

interface ChatComponentProps {
  websocketUrl: string;
}
const channelName = "ChatChannel";
const roomName = "1";

export default function ChatComponent({ websocketUrl }: ChatComponentProps) {
  const [newMessage, setNewMessage] = React.useState("");
  const { messages, sendMessage } = useActionCableConnection<Message, SpeakData>(websocketUrl, channelName, roomName);

  const handleSendMessage = async () => {
    sendMessage({ message: newMessage }, () => setNewMessage(""));
  };

  const disableSendButton = !newMessage || newMessage === "";

  return (
    <div>
      <h1>Chat</h1>
      <MessageList messages={messages} />
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

function MessageList({ messages }: { messages: Message[] }) {
  const Row = ({ index, style }: { index: number; style: React.CSSProperties }) => (
    <div className="p-2 bg-gray-800 rounded" style={style}>
      <span className="font-bold text-purple-400">{messages[index]?.user_id ?? "Unknown"}: </span>
      {messages[index]?.message}
    </div>
  );

  return (
    <List className="mb-4" height={400} itemCount={messages.length} itemSize={35} width="100%">
      {Row}
    </List>
  );
}
