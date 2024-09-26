import { createConsumer, Consumer, Subscription, Mixin } from "@rails/actioncable";
import React from "react";

type SubscriptionConnection<M> = Subscription<Consumer> &
  Mixin & {
    connected(): void;
    disconnected(): void;
    received(data: M): void;
  };

export function useActionCableConnection<M extends object, S extends object>(
  websocketUrl: string,
  channelName: string,
  roomName: string,
) {
  const cableRef = React.useRef<Consumer | null>(null);
  const connectionRef = React.useRef<SubscriptionConnection<M> | null>(null);

  // TODO: manage message history
  const [messages, setMessages] = React.useState<M[]>([]);
  const [channel, setChannel] = React.useState<string | null | undefined>(channelName);
  const [room, setRoom] = React.useState<string | null | undefined>(roomName);

  const subscribe = React.useCallback((channelName?: string, roomName?: string) => {
    if (channelName) {
      setChannel(channelName);
    }
    if (roomName) {
      setRoom(roomName);
    }
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

  const connectToCable = React.useCallback(
    (channelName?: string | null, roomName?: string | null, shouldReconnect = true) => {
      if (!channelName || !roomName) {
        console.warn("Channel or room not set"); // eslint-disable-line no-console

        return;
      }

      // Create a consumer
      const cable = createConsumer(websocketUrl);

      cableRef.current = cable;

      // Create a subscription to the chat channel
      const subscription = cable.subscriptions.create(
        { channel: channelName, room: roomName },
        {
          connected() {
            console.info("Connected to the chat channel"); // eslint-disable-line no-console
          },
          rejected() {
            console.info("Rejected from the chat channel"); // eslint-disable-line no-console
          },
          disconnected() {
            console.info("Disconnected from the chat channel"); // eslint-disable-line no-console
            // Attempt to reconnect after a delay, but only if it's not a reconnect attempt
            if (shouldReconnect) {
              let reconnectAttempts = 0;
              const maxReconnectAttempts = 5;

              const attemptReconnect = () => {
                if (reconnectAttempts < maxReconnectAttempts) {
                  reconnectAttempts++;
                  setTimeout(() => {
                    console.info(`Reconnect attempt ${reconnectAttempts}`); // eslint-disable-line no-console
                    connectToCable(channelName, roomName, false);
                  }, 5000);
                } else {
                  console.warn("Max reconnect attempts reached"); // eslint-disable-line no-console
                }
              };

              attemptReconnect();
            }
          },
          received(data: M) {
            console.info("Received message", data); // eslint-disable-line no-console
            setMessages((prevMessages) => [...prevMessages, data]);
          },
        },
      );

      connectionRef.current = subscription;
    },
    [websocketUrl],
  );

  React.useEffect(() => {
    connectToCable(channel, room);

    // Cleanup subscription on component unmount
    return () => {
      if (connectionRef.current) {
        connectionRef.current.unsubscribe();
      }
      if (cableRef.current) {
        cableRef.current.disconnect();
      }
    };
  }, [channel, room]);

  return { messages, sendMessage, subscribe, connectToCable };
}
