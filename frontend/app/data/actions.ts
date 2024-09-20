"use server";

import { paths } from "@/lib/api";
import createClient, { Middleware, FetchOptions } from "openapi-fetch";
import { auth as clerkAuth } from "@clerk/nextjs/server";
import { getVercelOidcToken } from "@vercel/functions/oidc";

export type Auth = ReturnType<typeof clerkAuth>;
export const CACHE_TIMEOUT: number = 300;

export async function getMe(auth?: Auth) {
  return (await BattleStadiumAPI(auth).Users.me()).data;
}

export async function getTournament(tournamentId: number, auth?: Auth) {
  return (await BattleStadiumAPI(auth).Tournaments.get(tournamentId)).data;
}

export async function getTournaments(auth?: Auth) {
  return (await BattleStadiumAPI(auth).Tournaments.list()).data?.data ?? [];
}

export async function getOrganizations(auth?: Auth) {
  return (await BattleStadiumAPI(auth).Organizations.list()).data?.data ?? [];
}

export async function getOrganization(slug: string, auth?: Auth) {
  return (await BattleStadiumAPI(auth).Organizations.get(slug)).data;
}

export async function getOrganizationTournaments(slug: string, auth?: Auth) {
  return (await BattleStadiumAPI(auth).Organizations.Tournaments.list(slug)).data;
}

export async function getUser(username: string, auth?: Auth) {
  return (await BattleStadiumAPI(auth).Users.get(username)).data;
}

export async function getUsers(auth?: Auth) {
  return (await BattleStadiumAPI(auth).Users.list()).data ?? [];
}

function BattleStadiumAPI(auth?: Auth) {
  const client = createBattleStadiumApiClient(auth);

  return {
    client,
    Tournaments: {
      list: async (page: number = 0, per_page: number = 20, options?: FetchOptions<paths["/tournaments"]["get"]>) => {
        return await client.GET("/tournaments", {
          ...nextConfig("listTournaments"),
          ...options,
          params: { query: { page, per_page } },
        });
      },
      get: async (id: number, options?: FetchOptions<paths["/tournaments/{id}"]["get"]>) => {
        return await client.GET("/tournaments/{id}", {
          ...options,
          params: { path: { id } },
          ...nextConfig(`getTournament-${id}`),
        });
      },
    },
    Users: {
      me: async (options?: FetchOptions<paths["/users/me"]["get"]>) => {
        const userId = auth?.userId;

        return await client.GET("/users/me", { ...nextConfig(`getMe-${userId}`), ...options });
      },
      list: async (_options?: FetchOptions<paths["/users"]["get"]>) => {
        return await client.GET("/users", {
          ...nextConfig("listUsers"),
        });
      },
      get: async (username: string, options?: FetchOptions<paths["/users/{username}"]["get"]>) => {
        return await client.GET("/users/{username}", {
          ...options,
          params: { path: { username } },
          ...nextConfig(`getUser-${username}`),
        });
      },
    },
    Organizations: {
      list: async (options?: FetchOptions<paths["/organizations"]["get"]>) => {
        return await client.GET("/organizations", {
          ...nextConfig("listOrganizations"),
          ...options,
          params: {
            query: {
              page: (options?.params?.query?.page as number) || 0,
              per_page: (options?.params?.query?.per_page as number) || 20,
            },
          },
        });
      },
      get: async (slug: string, options?: FetchOptions<paths["/organizations/{slug}"]["get"]>) => {
        return await client.GET("/organizations/{slug}", {
          ...nextConfig(`getOrganization-${slug}`),
          ...options,
          params: { path: { slug } },
        });
      },
      Tournaments: {
        list: async (slug: string, options?: FetchOptions<paths["/organizations/{slug}/tournaments"]["get"]>) => {
          return await client.GET("/organizations/{slug}/tournaments", {
            ...nextConfig(`listOrganizationTournaments-${slug}`),
            ...options,
            params: {
              path: { slug },
              ...options?.params,
            },
          });
        },
      },
    },
  };
}

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

function createBattleStadiumApiClient(auth?: Auth) {
  const baseUrl = getBaseUrl();
  const client = createClient<paths>({ baseUrl });

  client.use(authHeadersMiddleware(auth));

  return client;
}
