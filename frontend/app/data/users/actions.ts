"use server";

import { BattleStadiumApiClient, defaultConfig } from "@/lib/api";
import { paths } from "@/lib/api/openapi-v1";
import { auth } from "@clerk/nextjs/server";
import { FetchOptions } from "openapi-fetch";

export async function getMe(options?: FetchOptions<paths["/users/me"]["get"]>) {
  const { userId } = auth();

  if (!userId) {
    return null;
  }

  const userMeOptions = { ...defaultConfig(`getMe(${userId})`), ...options };

  return BattleStadiumApiClient().GET("/users/me", userMeOptions);
}

export async function getUsers(options?: FetchOptions<paths["/users"]["get"]>) {
  const usersOptions = {
    ...defaultConfig("listUsers"),
    ...options,
  };
  const skipClerkAuth = true;

  return BattleStadiumApiClient(skipClerkAuth).GET("/users", usersOptions);
}

export async function getUser(username: string, options?: FetchOptions<paths["/users/{username}"]["get"]>) {
  const userOptions = {
    ...defaultConfig(`getUser-${username}`),
    ...options,
    params: { path: { username } },
  };

  return BattleStadiumApiClient().GET("/users/{username}", userOptions);
}
