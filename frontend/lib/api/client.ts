import type { paths } from "@/lib/api";

import createClient, { Middleware } from "openapi-fetch";
import { auth as clerkAuth } from "@clerk/nextjs/server";
export const CACHE_TIMEOUT: number = 300;
export type Auth = ReturnType<typeof clerkAuth>;
import { getVercelOidcToken } from "@vercel/functions/oidc";

function getBaseUrl() {
  if (process.env.NODE_ENV === "production" && process.env.PROD_API_BASE_URL) {
    return `${process.env.PROD_API_BASE_URL}/api/v1`;
  }

  return `http://${process.env.BACKEND_HOST}:10000/api/v1`;
}

function authHeadersMiddleware(auth?: Auth): Middleware {
  const openapiFetchMiddleware: Middleware = {
    async onRequest({ request }) {
      if (auth?.sessionId) {
        const token = await auth.getToken();

        request.headers.set("Authorization", `Bearer ${token}`);
      }

      request.headers.set("X-Vercel-OIDC-Token", `${await getVercelOidcToken()}`);

      return request;
    },
  };

  return openapiFetchMiddleware;
}

function nextConfig(tag: string, revalidate?: number) {
  return {
    next: { tags: [tag], revalidate: revalidate ?? CACHE_TIMEOUT },
  };
}

export default function createBattleStadiumApiClient(auth?: Auth) {
  const baseUrl = getBaseUrl();
  const client = createClient<paths>({ baseUrl });

  client.use(authHeadersMiddleware(auth));

  return {
    client,
    nextConfig,
  };
}
