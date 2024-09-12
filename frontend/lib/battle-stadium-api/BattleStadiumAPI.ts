import type { paths } from "./api-v1";

import { auth } from "@clerk/nextjs/server";
import createClient, { Middleware } from "openapi-fetch";
export const CACHE_TIMEOUT: number = 300;

const getBaseUrl = () => {
  if (process.env.NODE_ENV === "production") {
    return "https://api.battlestadium.gg/api/v1";
  }

  return `http://${process.env.BACKEND_HOST}:10000/api/v1`;
};

const clerkSessionMiddleware: Middleware = {
  async onRequest({ request }) {
    const { getToken } = auth();
    const sessionToken = await getToken();

    request.headers.set("Authorization", sessionToken ? `Bearer ${sessionToken}` : "");

    return request;
  },
};

const BattleStadiumAPI = createClient<paths>({
  baseUrl: getBaseUrl(),
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

BattleStadiumAPI.use(clerkSessionMiddleware);

export default BattleStadiumAPI;
export { BattleStadiumAPI };
