const DEFAULT_WS_PORT = "10000";
const DEFAULT_WS_PATH = "/cable";

const constructWsUrl = (host: string, protocol: string) => `${protocol}://${host}:${DEFAULT_WS_PORT}${DEFAULT_WS_PATH}`;

export default function websocketUrl(): string {
  const isProduction = process.env.NODE_ENV === "production";
  const protocol = isProduction ? "wss" : "ws";

  if (isProduction && process.env.WEBSOCKET_URL) {
    return `${protocol}://${process.env.WEBSOCKET_URL}/${DEFAULT_WS_PATH}`;
  }

  if (process.env.BACKEND_HOST) {
    return constructWsUrl(process.env.BACKEND_HOST, protocol);
  }

  if (isProduction) {
    throw new Error("No production WebSocket URL configured!");
  }

  return constructWsUrl("localhost", protocol);
}
