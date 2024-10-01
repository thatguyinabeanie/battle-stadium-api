import createFetchClient, { Middleware } from "openapi-fetch";

import { getVercelOidcToken } from "@vercel/functions/oidc";
import { auth } from "@clerk/nextjs/server";
import { paths } from "@/lib/api/openapi-v1";

function getBaseUrl() {
  const isProduction = process.env.NODE_ENV === "production";

  if (isProduction && process.env.PROD_API_BASE_URL) {
    return `${process.env.PROD_API_BASE_URL}/api/v1`;
  }

  const port = isProduction ? "10001" : "10000";
  const defaultHost = isProduction ? "backend-prod" : "backend";
  const host = process.env.BACKEND_HOST ?? defaultHost;

  return `http://${host}:${port}/api/v1`;
}

export function BattleStadiumApiClient() {
  const baseUrl = getBaseUrl();
  const fetchClient = createFetchClient<paths>({ baseUrl });

  const authMiddleware: Middleware = {
    async onRequest({ request }) {

      if (process.env.NODE_ENV !== "development") {
        request.headers.set("X-Vercel-OIDC-Token", `${await getVercelOidcToken()}`);
      }

      request.headers.set("Authorization", `Bearer ${await auth().getToken()}`);

      return request;
    },
  };

  fetchClient.use(authMiddleware);

  return fetchClient;
}
