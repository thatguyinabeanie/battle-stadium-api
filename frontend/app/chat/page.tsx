import ChatComponent from "@/components/chat";
import websocketUrl from "@/lib/websocket/websocket-url";

export default function ChatPage() {
  return <ChatComponent channelName={"ChatChannel"} roomName={"1"} websocketUrl={websocketUrl()} />;
}
