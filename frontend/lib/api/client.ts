import createFetchClient, { Middleware } from "openapi-fetch";

import { getVercelOidcToken } from "@vercel/functions/oidc";
import { auth } from "@clerk/nextjs/server";
import { paths } from "@/lib/api/openapi-v1";

function getBaseUrl() {
  if (process.env.NODE_ENV === "production") {
    if (process.env.PROD_API_BASE_URL) {
      return `${process.env.PROD_API_BASE_URL}/api/v1`;
    }

    if (process.env.BACKEND_HOST) {
      return `http://${process.env.BACKEND_HOST}:10001/api/v1`;
    }

    return `http://backend-prod:10001/api/v1`;
  }

  if (process.env.BACKEND_HOST) {
    return `http://${process.env.BACKEND_HOST}:10000/api/v1`;
  }

  return `http://backend:10000/api/v1`;
}

export function BattleStadiumApiClient(skipClerkAuth: boolean = false) {
  const baseUrl = getBaseUrl();
  const fetchClient = createFetchClient<paths>({ baseUrl });

  const authMiddleware: Middleware = {
    async onRequest({ request }) {
      if (!skipClerkAuth) {
        request.headers.set("Authorization", `Bearer ${await auth().getToken()}`);
      }

      request.headers.set("X-Vercel-OIDC-Token", `${await getVercelOidcToken()}`);

      return request;
    },
  };

  fetchClient.use(authMiddleware);

  return fetchClient;
}
