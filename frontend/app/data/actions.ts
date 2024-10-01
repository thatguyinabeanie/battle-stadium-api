"use server";

import { BattleStadiumApiClient } from "@/lib/api";
import { paths } from "@/lib/api/openapi-v1";

import { auth } from "@clerk/nextjs/server";
import { FetchOptions } from "openapi-fetch";

const DEFAULT_CACHE_TIMEOUT: number = 300;
const skipClerkAuth = true;

function defaultConfig(tag: string, revalidate?: number) {
  return {
    next: { tags: [tag], revalidate: revalidate ?? DEFAULT_CACHE_TIMEOUT },
  };
}

export async function getMe(options?: FetchOptions<paths["/users/me"]["get"]>) {
  const userId = auth()?.userId;

  const userMeOptions = { ...defaultConfig(`getMe(${userId})`), ...options };

  return BattleStadiumApiClient().GET("/users/me", userMeOptions);
}

export async function getTournament(id: number, options?: FetchOptions<paths["/tournaments/{id}"]["get"]>) {
  const tournamentOptions = {
    ...defaultConfig(`getTournament(${id})`),
    ...options,
    params: { path: { id } },
  };

  return BattleStadiumApiClient().GET("/tournaments/{id}", tournamentOptions);
}

export async function getTournaments(
  page: number = 0,
  per_page: number = 20,
  options?: FetchOptions<paths["/tournaments"]["get"]>,
) {
  const tournamentsOptions = {
    ...defaultConfig("getTournaments"),
    ...options,
    params: { query: { page, per_page } },
  };

  return BattleStadiumApiClient(skipClerkAuth).GET("/tournaments", tournamentsOptions);
}

export async function getOrganizations(options?: FetchOptions<paths["/organizations"]["get"]>) {
  const organizationsOptions = {
    ...defaultConfig("getOrganizations"),
    ...options,
    params: {
      query: {
        page: (options?.params?.query?.page as number) || 0,
        per_page: (options?.params?.query?.per_page as number) || 20,
      },
    },
  };

  return BattleStadiumApiClient(skipClerkAuth).GET("/organizations", organizationsOptions);
}

export async function getOrganization(slug: string, options?: FetchOptions<paths["/organizations/{slug}"]["get"]>) {
  const organizationOptions = {
    ...defaultConfig(`getOrganization(${slug})`),
    ...options,
    params: { path: { slug } },
  };

  return BattleStadiumApiClient().GET("/organizations/{slug}", organizationOptions);
}

export async function getOrganizationTournaments(
  slug: string,
  options?: FetchOptions<paths["/organizations/{slug}/tournaments"]["get"]>,
) {
  const organizationTournamentsOptions = {
    ...defaultConfig(`getOrganizationTournaments(${slug})`),
    ...options,
    params: {
      path: { slug },
      ...options?.params,
    },
  };

  return BattleStadiumApiClient().GET("/organizations/{slug}/tournaments", organizationTournamentsOptions);
}

export async function getUser(username: string, options?: FetchOptions<paths["/users/{username}"]["get"]>) {
  const userOptions = {
    ...defaultConfig(`getUser-${username}`),
    ...options,
    params: { path: { username } },
  };

  return BattleStadiumApiClient().GET("/users/{username}", userOptions);
}

export async function getUsers(options?: FetchOptions<paths["/users"]["get"]>) {
  const usersOptions = {
    ...defaultConfig("listUsers"),
    ...options,
  };

  return BattleStadiumApiClient().GET("/users", usersOptions);
}
