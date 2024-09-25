import { createConsumer, Consumer, Subscription, Mixin } from "@rails/actioncable";
import React from "react";

type SubscriptionConnection<M> = Subscription<Consumer> &
  Mixin & {
    connected(): void;
    disconnected(): void;
    received(data: M): void;
  };

export function useActionCableConnection<M extends object, S extends object>(websocketUrl: string) {
  const cableRef = React.useRef<Consumer | null>(null);
  const connectionRef = React.useRef<SubscriptionConnection<M> | null>(null);

  const [messages, setMessages] = React.useState<M[]>([]);
  const [channel, setChannel] = React.useState<string | null>(null);
  const [room, setRoom] = React.useState<string | null>(null);

  const subscribe = React.useCallback((channelName: string, roomName: string) => {
    setChannel(channelName);
    setRoom(roomName);
  }, []);

  const sendMessage = React.useCallback((speakData: S, onSuccess?: () => void) => {
    if (!connectionRef.current) {
      throw new Error("Connection not established");
    } else if (connectionRef.current.perform("speak", speakData)) {
      if (onSuccess) {
        onSuccess();
      }

      return true;
    }
  }, []);

  const connectToCable = React.useCallback(() => {
    if (!channel || !room) {
      console.warn("Channel or room not set"); // eslint-disable-line no-console

      return;
    }

    // Create a consumer
    const cable = createConsumer(websocketUrl);

    cableRef.current = cable;

    // Create a subscription to the chat channel
    const subscription = cable.subscriptions.create(
      { channel, room },
      {
        connected() {
          console.info("Connected to the chat channel"); // eslint-disable-line no-console
        },
        rejected(){
          console.error("Rejected from the chat channel"); // eslint-disable-line no-console
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
  }, [websocketUrl, channel, room]);

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
  }, [connectToCable]);

  return { messages, sendMessage, subscribe };
}
