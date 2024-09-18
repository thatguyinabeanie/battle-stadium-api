import type { paths } from "./openapi-v1.d";

import createClient, { FetchOptions } from "openapi-fetch";
import { auth as clerkAuth } from "@clerk/nextjs/server";
export const CACHE_TIMEOUT: number = 300;
import { Middleware } from "openapi-fetch";
export type Auth = ReturnType<typeof clerkAuth>;

const getBaseUrl = () => {
  if (process.env.NODE_ENV === "production" && process.env.API_BASE_URL) {
    return `${process.env.API_BASE_URL}/api/v1`;
  }

  return `http://${process.env.BACKEND_HOST}:10000/api/v1`;
};

export interface PaginationParams {
  page?: number;
  per_page?: number;
}

const clerkAuthMiddleware = (auth?: Auth): Middleware => {
  const openapiFetchMiddleware: Middleware = {
    async onRequest({ request }) {
      if (auth && auth.sessionId) {
        const token = await auth.getToken();

        request.headers.set("Authorization", `Bearer ${token}`);
      }

      return request;
    },
  };

  return openapiFetchMiddleware;
};

export const BattleStadiumAPI = (auth?: Auth) => {
  const baseUrl = getBaseUrl();
  const client = createClient<paths>({ baseUrl });

  client.use(clerkAuthMiddleware(auth));

  return {
    client,
    Tournaments: {
      list: async (page: number = 0, per_page: number = 20) => {
        return await client.GET("/tournaments", {
          params: { query: { page, per_page } },
          next: { tags: ["listTournaments"], revalidate: CACHE_TIMEOUT },
        });
      },
      get: async (id: number, _options?: FetchOptions<unknown>) => {
        return await client.GET("/tournaments/{id}", {
          params: { path: { id } },
          next: { revalidate: CACHE_TIMEOUT },
        });
      },
    },
    Users: {
      me: async (options?: FetchOptions<{ next: NextFetchRequestConfig }>) => {
        const headers = options?.headers;
        const next = {
          ...options?.next,
          revalidate: CACHE_TIMEOUT,
        };

        return await client.GET("/users/me", { headers, next });
      },
      list: async (options?: FetchOptions<object>) => {
        return await client.GET("/users", {
          headers: {
            ...options?.headers,
          },
          next: {
            ...options?.next,
            tags: ["listUsers"],
            revalidate: CACHE_TIMEOUT,
          },
        });
      },
      get: async (username: string, options?: FetchOptions<unknown>) => {
        const headers = options?.headers;

        const next = {
          ...options?.next,
          revalidate: CACHE_TIMEOUT,
        };

        return await client.GET("/users/{username}", {
          headers,
          params: { path: { username } },
          next,
        });
      },
    },
    Organizations: {
      list: async (options?: FetchOptions<{ query?: PaginationParams }>) => {
        const query = options?.params?.query;

        return await client.GET("/organizations", {
          params: {
            query: {
              page: (query?.page as number) || 0,
              per_page: (query?.per_page as number) || 20,
            },
          },
          next: { tags: ["listOrganizations"], revalidate: CACHE_TIMEOUT },
        });
      },
      get: async (org_id: number, _options?: FetchOptions<unknown>) => {
        return await client.GET("/organizations/{org_id}", {
          params: { path: { org_id } },
        });
      },
      Tournaments: {
        list: async (org_id: number, options?: FetchOptions<{ query?: PaginationParams }>) => {
          const next: NextFetchRequestConfig = {
            tags: ["listTournaments"],
            revalidate: CACHE_TIMEOUT,
            ...options?.next,
          };

          return await client.GET("/organizations/{org_id}/tournaments", {
            params: {
              path: { org_id },
            },
            next,
          });
        },
      },
    },
  };
};

export default BattleStadiumAPI;
