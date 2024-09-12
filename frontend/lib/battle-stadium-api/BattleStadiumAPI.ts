import { auth } from "@clerk/nextjs/server";
import createClient, { Middleware } from "openapi-fetch";
import type { paths } from "./v1";
export const CACHE_TIMEOUT: number = 300;

const getBaseUrl = () => {
  if(process.env.NODE_ENV === "production") {
    return "https://api.battlestadium.gg/api/v1";
  }
  return `http://${process.env.BACKEND_HOST}:10000/api/v1`;
}

const clerkSessionMiddleware: Middleware = {
  async onRequest ({ request, options }) {

    const { getToken } = auth();
    const sessionToken = await getToken();

    request.headers.set("Authorization", `${sessionToken ? `Bearer ${sessionToken}` : "Bearer"}`);
    return request;
  },

  // async onResponse ({ request, response, options }) {
  //   const { body, ...resOptions } = response;
  //   // change status of response
  //   return new Response(body, { ...resOptions, status: 200 });
  // },
};

const BattleStadiumAPI = createClient<paths>({
  baseUrl: getBaseUrl(),
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json",
  },
});

BattleStadiumAPI.use(clerkSessionMiddleware);

export default BattleStadiumAPI;
export { BattleStadiumAPI };
