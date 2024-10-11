import createFetchClient, { Middleware } from "openapi-fetch";
import { env } from "@/env.mjs";
import { getVercelOidcToken } from "@vercel/functions/oidc";
import { auth } from "@clerk/nextjs/server";
import { paths } from "@/lib/api/openapi-v1";

export function getBaseUrl() {
  if ([env.NODE_ENV, env.VERCEL_ENV].includes("production")) {
    return `${env.PROD_API_BASE_URL}`;
  }

  return `http://${env.LOCAL_DEV_BACKEND_HOST}:${env.LOCAL_DEV_BACKEND_PORT}`;
}

export function BattleStadiumApiClient(skipClerkAuth: boolean = false) {
  const baseUrl = `${getBaseUrl()}/api/v1`;
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
