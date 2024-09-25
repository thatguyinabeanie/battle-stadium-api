import ChatComponent from "@/components/chat";
const getWebsocketUrl = () => {
  if (process.env.NODE_ENV === "production") {
    if (process.env.WEBSOCKET_URL) {
      return `wss://${process.env.WEBSOCKET_URL}/cable`;
    }

    if (process.env.BACKEND_HOST) {
      return `wss://${process.env.BACKEND_HOST}:10000/cable`;
    }

    return "ws://backend-prod:10000/cable";
  }

  if (process.env.BACKEND_HOST) {
    return `ws://${process.env.BACKEND_HOST}:10000/cable`;
  }

  return "ws://localhost:10000/cable";
};

export default function ChatPage() {
  return (
    <div>
      <ChatComponent websocketUrl={getWebsocketUrl()} />
    </div>
  );
}
