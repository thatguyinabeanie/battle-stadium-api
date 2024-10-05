import createFetchClient, { Middleware } from "openapi-fetch";
import { env } from "@/env.mjs";
import { getVercelOidcToken } from "@vercel/functions/oidc";
import { auth } from "@clerk/nextjs/server";
import { paths } from "@/lib/api/openapi-v1";

function getBaseUrl() {
  const isProduction = env.NODE_ENV === "production";

  if (isProduction && env.PROD_API_BASE_URL) {
    return `${env.PROD_API_BASE_URL}/api/v1`;
  }

  const port = isProduction ? "10001" : "10000";
  const defaultHost = isProduction ? "backend-prod" : "backend";
  const host = env.BACKEND_HOST ?? defaultHost;

  return `http://${host}:${port}/api/v1`;
}

export function BattleStadiumApiClient(skipClerkAuth: boolean = false) {
  const baseUrl = getBaseUrl();
  const fetchClient = createFetchClient<paths>({ baseUrl });

  const authMiddleware: Middleware = {
    async onRequest({ request }) {
      if (env.NODE_ENV !== "development") {
        request.headers.set("X-Vercel-OIDC-Token", `${await getVercelOidcToken()}`);
      }

      if (!skipClerkAuth) {
        request.headers.set("Authorization", `Bearer ${await auth().getToken()}`);
      }

      return request;
    },
  };

  fetchClient.use(authMiddleware);

  return fetchClient;
}
