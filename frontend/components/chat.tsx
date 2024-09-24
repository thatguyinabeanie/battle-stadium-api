// components/ChatComponent.tsx
"use client";

import React, { useEffect, useState, useRef } from "react";
import { createConsumer, Consumer } from "@rails/actioncable";
import crypto from 'crypto';

const ChatComponent = () => {
  const [messages, setMessages] = useState<string[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const cableRef = useRef<Consumer | null>(null);
  const subscriptionRef = useRef<any>(null);

  const connectToCable = () => {
    // Create a consumer
    const cable = createConsumer("ws://localhost:10000/cable");
    cableRef.current = cable;

    // Create a subscription to the chat channel
    const subscription = cable.subscriptions.create(
      { channel: "ChatChannel", room: "1" },
      {
        connected () {
          console.log("Connected to the chat channel");
        },
        disconnected () {
          console.log("Disconnected from the chat channel");
          // Attempt to reconnect after a delay
          setTimeout(() => {
            connectToCable();
          }, 5000);
        },
        received (data) {
          console.log("Received data:", data);
          setMessages((prevMessages) => [...prevMessages, data.message]);
        },
      },
    );

    subscriptionRef.current = subscription;
  };

  useEffect(() => {
    connectToCable();

    // Cleanup subscription on component unmount
    return () => {
      if (subscriptionRef.current) {
        subscriptionRef.current.unsubscribe();
      }
      if (cableRef.current) {
        cableRef.current.disconnect();
      }
    };
  }, []);

  const handleSendMessage = () => {
    if (subscriptionRef.current) {
      subscriptionRef.current.perform("speak", { message: newMessage });
    }
  };

  return (
    <div>
      <h1>Chat</h1>
      <ul>
        { messages.map((msg) => (
          <li key={ crypto.createHash('sha256').update(msg).digest('hex') }>{ msg }</li>
        )) }
      </ul>
      <input
        type="text"
        value={ newMessage }
        onChange={ (e) => setNewMessage(e.target.value) }
      />
      <button onClick={ handleSendMessage }>Send</button>
    </div>
  );
};

export default ChatComponent;
