// components/ChatComponent.tsx
"use client";

import * as React from "react";
import { createConsumer, Consumer, Subscription, Mixin } from "@rails/actioncable";
import { Button } from "@nextui-org/react";

export interface Message {
  key: string;
  user_id: string;
  timestamp: string;
  message: string;
}

export interface SpeakData {
  message: string;
}

type SubscriptionConnection<M> = Subscription<Consumer> &
  Mixin & {
    connected(): void;
    disconnected(): void;
    received(data: M): void;
  };

const useCableConnection = <M extends object, S extends object>() => {
  const [messages, setMessages] = React.useState<M[]>([]);
  const cableRef = React.useRef<Consumer | null>(null);
  const connectionRef = React.useRef<SubscriptionConnection<M> | null>(null);

  const sendMessage = (speakData: S, onSuccess?: () => void) => {
    if (!connectionRef.current) {
      throw new Error("Connection not established");
    } else if (connectionRef.current.perform("speak", speakData)) {
      if (onSuccess) onSuccess();

      return true;
    }
  };

  const connectToCable = () => {
    // Create a consumer
    const cable = createConsumer("ws://localhost:10000/cable");

    cableRef.current = cable;

    // Create a subscription to the chat channel
    const subscription = cable.subscriptions.create(
      { channel: "ChatChannel", room: "1" },
      {
        connected() {
          console.info("Connected to the chat channel"); // eslint-disable-line no-console
        },
        disconnected() {
          console.error("Disconnected from the chat channel"); // eslint-disable-line no-console
          // Attempt to reconnect after a delay
          setTimeout(() => {
            connectToCable();
          }, 5000);
        },
        received(data: M) {
          setMessages((prevMessages) => [...prevMessages, data]);
        },
      },
    );

    connectionRef.current = subscription;
  };

  React.useEffect(() => {
    connectToCable();

    // Cleanup subscription on component unmount
    return () => {
      if (connectionRef.current) {
        connectionRef.current.unsubscribe();
      }
      if (cableRef.current) {
        cableRef.current.disconnect();
      }
    };
  }, []);

  return { messages, sendMessage };
};

export default function ChatComponent() {
  const [newMessage, setNewMessage] = React.useState("");
  const { messages, sendMessage } = useCableConnection<Message, SpeakData>();

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
