import { env } from "@/env.mjs";

const DEFAULT_WS_PORT = "10000";
const DEFAULT_WS_PATH = "/cable";

const constructWsUrl = (host: string, protocol: string) => `${protocol}://${host}:${DEFAULT_WS_PORT}${DEFAULT_WS_PATH}`;

export default function websocketUrl(): string {
  const isProduction = env.NODE_ENV === "production";
  const protocol = isProduction ? "wss" : "ws";

  if (isProduction && env.WEBSOCKET_URL) {
    return `${protocol}://${env.WEBSOCKET_URL}/${DEFAULT_WS_PATH}`;
  }

  if (env.LOCAL_DEV_BACKEND_HOST) {
    return constructWsUrl(env.LOCAL_DEV_BACKEND_HOST, protocol);
  }

  if (isProduction) {
    throw new Error("No production WebSocket URL configured!");
  }

  return constructWsUrl("localhost", protocol);
}
