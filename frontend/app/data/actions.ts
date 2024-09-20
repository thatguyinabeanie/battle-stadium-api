"use server";

import { Auth, paths } from "@/lib/api";
import createBattleStadiumApiClient from "@/lib/api/client";
import { auth } from "@clerk/nextjs/server";
import { FetchOptions } from "openapi-fetch";

export async function getMe() {
  return (await BattleStadiumAPI(auth()).Users.me()).data;
}

export async function getTournament(tournamentId: number) {
  return (await BattleStadiumAPI(auth()).Tournaments.get(tournamentId)).data;
}

export async function getTournaments() {
  return (await BattleStadiumAPI(auth()).Tournaments.list()).data?.data ?? [];
}

export async function getOrganizations() {
  return (await BattleStadiumAPI(auth()).Organizations.list()).data?.data ?? [];
}

export async function getOrganization(slug: string) {
  return (await BattleStadiumAPI(auth()).Organizations.get(slug)).data;
}

export async function getOrganizationTournaments(slug: string) {
  return (await BattleStadiumAPI(auth()).Organizations.Tournaments.list(slug)).data;
}

export async function getUser(username: string) {
  return (await BattleStadiumAPI(auth()).Users.get(username)).data;
}

export async function getUsers() {
  return (await BattleStadiumAPI(auth()).Users.list()).data ?? [];
}

function BattleStadiumAPI(auth?: Auth) {
  const { client, nextConfig } = createBattleStadiumApiClient(auth);

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
